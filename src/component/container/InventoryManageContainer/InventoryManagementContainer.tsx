"use client"
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { InventoryHeader } from '@/component/organism/InventoryHeader/InventoryHeader'
import { AddressDisplay } from '@/component/organism/AddressDisplay/AddressDisplay'
import { FilterSection } from '@/component/organism/FilterSection/FilterSection'
import { InventoryContentArea } from '@/component/organism/InventoryContentArea/InventoryContentArea'
import { PaginationControls } from '@/component/organism/PaginationControls/PaginationControls'
import { Modal } from '@/component/atom/Modal/Modal'
import { RecipientInfoForm } from '@/component/organism/RecipientInfoForm/RecipientInfoForm'
import { InventoryDetailInfo } from '@/component/organism/InventoryDetailInfo/InventoryDetailInfo'
import { Loading } from '@/component/atom/Loading/Loading'
import styles from './InventoryManagementContainer.module.css'
import { defaultRecipientInfo, INVENTORY_FILTER_TYPE, INVENTORY_ITEM_TYPE, SEARCH_FILTER_TYPE, InventoryItemType } from '@/constant/Inventory.constant'
import { InventoryItem, RecipientInfo } from '@/type/Inventory.type'
import {
    fetchInventoryItems,
    fetchRecipientInfo,
} from '@/lib/api/inventory.api'
import { useDeleteInventoryItem, useResetData } from '@/hooks/useInventoryMutations'
import { useSaveRecipientInfo } from '@/hooks/useRecipientInfoMutations'

export const InventoryManagementContainer = () => {
    const [appliedSearchQuery, setAppliedSearchQuery] = useState('')
    const [appliedSearchFilter, setAppliedSearchFilter] = useState<SEARCH_FILTER_TYPE>(SEARCH_FILTER_TYPE.PRODUCT_NAME)
    const [copied, setCopied] = useState(false)

    // 필터 및 정렬 상태
    const [activeFilter, setActiveFilter] = useState<INVENTORY_ITEM_TYPE>(INVENTORY_ITEM_TYPE.ALL)
    const [sortBy, setSortBy] = useState<INVENTORY_FILTER_TYPE>(INVENTORY_FILTER_TYPE.NEWEST)

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(1)

    const {
        data: items = [],
        isLoading: isInventoryLoading,
    } = useQuery({
        queryKey: ['inventory'],
        queryFn: fetchInventoryItems,
    })

    const {
        data: recipientInfoData,
        isLoading: isRecipientInfoLoading,
    } = useQuery({
        queryKey: ['recipient-info'],
        queryFn: fetchRecipientInfo,
    })

    const handleSearch = (query: string, filter: string) => {
        setAppliedSearchQuery(query)
        setAppliedSearchFilter(Number(filter) as SEARCH_FILTER_TYPE)
    }

    const handleCopyAddress = async () => {
        if (recipientInfoData?.id) {
            try {
                await navigator.clipboard.writeText(recipientInfoData.id)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Failed to copy:', err)
            }
        }
    }

    const [isRecipientInfoModalOpen, setIsRecipientInfoModalOpen] = useState(false)
    const [isInventoryDetailModalOpen, setIsInventoryDetailModalOpen] = useState(false)
    const [inventoryDetail, setInventoryDetail] = useState<InventoryItem | null>(null)

    // 데이터 초기화 mutation
    const resetMutation = useResetData()

    // 데이터 초기화 핸들러
    const handleReset = () => {
        if (!confirm('모든 데이터를 초기 상태로 되돌리시겠습니까?')) {
            return
        }
        resetMutation.mutate()
    }

    // 수령정보 저장 mutation
    const saveRecipientInfoMutation = useSaveRecipientInfo(() => {
        setIsRecipientInfoModalOpen(false)
    })

    // 수령정보 모달 확인 (저장된 데이터를 받아서 처리)
    const handleSaveRecipientInfo = (data: RecipientInfo) => {
        const isUpdate = (recipientInfoData?.name ?? '') !== '' || (recipientInfoData?.email ?? '') !== ''
        saveRecipientInfoMutation.mutate({ data, isUpdate })
    }

    // 인벤토리 삭제 mutation
    const deleteMutation = useDeleteInventoryItem(() => {
        setIsInventoryDetailModalOpen(false)
    })

    // 인벤토리 상세 모달 사용하기
    const handleUseInventoryItem = () => {
        if (!inventoryDetail) return
        deleteMutation.mutate(inventoryDetail.id)
    }

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // 아이템 클릭시, 사용 모달 노출
    const handleItemClick = (item: any) => {
        setInventoryDetail(item);
        setIsInventoryDetailModalOpen(true)
    }

    // 필터/정렬 변경 시 페이지 리셋
    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilter, sortBy])

    // 필터 및 정렬된 아이템 계산
    const filteredItems = items
        .filter((item) => {
            const matchesFilter = (() => {
                switch (activeFilter) {
                    case INVENTORY_ITEM_TYPE.GIFTICON:
                        return item.filterType === InventoryItemType[INVENTORY_ITEM_TYPE.GIFTICON]
                    case INVENTORY_ITEM_TYPE.DELIVERY:
                        return item.filterType === InventoryItemType[INVENTORY_ITEM_TYPE.DELIVERY]
                    default:
                        return true
                }
            })()

            const matchesSearch = appliedSearchQuery.trim() === '' ||
                (appliedSearchFilter === SEARCH_FILTER_TYPE.PRODUCT_NAME && item.name.toLowerCase().includes(appliedSearchQuery.toLowerCase()))

            return matchesFilter && matchesSearch
        })
        .sort((a, b) => {
            const aTime = new Date(a.validityPeriod).getTime()
            const bTime = new Date(b.validityPeriod).getTime()

            if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
                return 0
            }
            return sortBy === INVENTORY_FILTER_TYPE.NEWEST ? bTime - aTime : aTime - bTime
        })


    if (isInventoryLoading || isRecipientInfoLoading) {
        return (
            <main className={styles.main}>
                <Loading className={styles.pageLoading} />
            </main>
        )
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <InventoryHeader onReset={handleReset} />
            </div>

            <div className={styles.container}>
                <AddressDisplay
                    address={recipientInfoData?.id ?? ''}
                    copied={copied}
                    onCopy={handleCopyAddress}
                    onModifyReceipt={() => setIsRecipientInfoModalOpen(true)}
                />
            </div>
            <div className={styles.container}>
                <FilterSection
                    activeFilter={activeFilter}
                    sortBy={sortBy}
                    onFilterChange={setActiveFilter}
                    onSortChange={setSortBy}
                    onSearch={handleSearch}
                />
            </div>
            <div className={styles.container}>
                <InventoryContentArea
                    items={filteredItems}
                    onItemClick={handleItemClick}
                />
            </div>
            <div className={styles.container}>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* 수령정보입력 모달 */}
            <Modal
                isOpen={isRecipientInfoModalOpen}
                onClose={() => setIsRecipientInfoModalOpen(false)}
                title="수령정보입력"
            >
                <RecipientInfoForm
                    initialData={recipientInfoData || defaultRecipientInfo}
                    onSave={handleSaveRecipientInfo}
                    onClose={() => setIsRecipientInfoModalOpen(false)}
                />
            </Modal>

            {/* 인벤토리 상세 모달 */}
            <Modal
                isOpen={isInventoryDetailModalOpen}
                onClose={() => setIsInventoryDetailModalOpen(false)}
                title="인벤토리"
            >
                <InventoryDetailInfo
                    inventoryItem={inventoryDetail}
                    onClose={() => setIsInventoryDetailModalOpen(false)}
                    onConfirm={handleUseInventoryItem}
                />
            </Modal>
        </main>
    )
}
