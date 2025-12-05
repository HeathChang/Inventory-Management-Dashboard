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
import { defaultRecipientInfo, INVENTORY_FILTER_TYPE, INVENTORY_ITEM_TYPE, SEARCH_FILTER_TYPE, ITEMS_PER_PAGE } from '@/constant/Inventory.constant'
import { InventoryItem, RecipientInfo } from '@/type/Inventory.type'
import {
    fetchInventoryItems,
    fetchRecipientInfo,
} from '@/lib/api/inventory.api'
import { useDeleteInventoryItem, useResetData } from '@/hooks/useInventoryMutations'
import { useSaveRecipientInfo } from '@/hooks/useRecipientInfoMutations'
import { copyToClipboard } from '@/util/clipboard'

export const InventoryManagementContainer = () => {
    const [appliedSearchQuery, setAppliedSearchQuery] = useState('')
    const [appliedSearchFilter, setAppliedSearchFilter] = useState<SEARCH_FILTER_TYPE>(SEARCH_FILTER_TYPE.PRODUCT_NAME)
    const [copied, setCopied] = useState(false)

    const [activeFilter, setActiveFilter] = useState<INVENTORY_ITEM_TYPE>(INVENTORY_ITEM_TYPE.ALL)
    const [sortBy, setSortBy] = useState<INVENTORY_FILTER_TYPE>(INVENTORY_FILTER_TYPE.NEWEST)

    const [currentPage, setCurrentPage] = useState(1)

    const {
        data: inventoryData,
        isLoading: isInventoryLoading,
    } = useQuery({
        queryKey: ['inventory', currentPage, activeFilter, sortBy, appliedSearchQuery, appliedSearchFilter],
        queryFn: () => fetchInventoryItems({
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            filterType: activeFilter,
            sortBy: sortBy,
            searchQuery: appliedSearchQuery,
            searchFilter: appliedSearchFilter,
        }),
        staleTime: 60 * 1000
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
            const success = await copyToClipboard(recipientInfoData.id)
            if (success) {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            }
        }
    }

    const [isRecipientInfoModalOpen, setIsRecipientInfoModalOpen] = useState(false)
    const [isInventoryDetailModalOpen, setIsInventoryDetailModalOpen] = useState(false)
    const [inventoryDetail, setInventoryDetail] = useState<InventoryItem | null>(null)

    const resetMutation = useResetData()

    const handleReset = () => {
        if (!confirm('모든 데이터를 초기 상태로 되돌리시겠습니까?')) {
            return
        }
        resetMutation.mutate()
    }

    const saveRecipientInfoMutation = useSaveRecipientInfo(() => {
        setIsRecipientInfoModalOpen(false)
    })

    const handleSaveRecipientInfo = (data: RecipientInfo) => {
        const isUpdate = (recipientInfoData?.name ?? '') !== '' || (recipientInfoData?.email ?? '') !== ''
        saveRecipientInfoMutation.mutate({ data, isUpdate })
    }

    const deleteMutation = useDeleteInventoryItem(() => {
        setIsInventoryDetailModalOpen(false)
    })

    useEffect(() => {
        const items = inventoryData?.items || []
        const totalPages = inventoryData?.pagination.totalPages || 0
        if (items.length === 0 && currentPage > 1 && totalPages > 0) {
            setCurrentPage(currentPage - 1)
        }
    }, [inventoryData, currentPage])

    const handleUseInventoryItem = () => {
        if (!inventoryDetail) return
        deleteMutation.mutate(inventoryDetail.id)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleItemClick = (item: InventoryItem) => {
        setInventoryDetail(item);
        setIsInventoryDetailModalOpen(true)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [activeFilter, sortBy, appliedSearchQuery, appliedSearchFilter])

    if (isInventoryLoading || isRecipientInfoLoading) {
        return (
            <main className={styles.main}>
                <Loading />
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
                    items={inventoryData?.items || []}
                    onItemClick={handleItemClick}
                />
            </div>
            <div className={styles.container}>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={inventoryData?.pagination.totalPages || 0}
                    onPageChange={handlePageChange}
                />
            </div>

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

            <Modal
                isOpen={isInventoryDetailModalOpen}
                onClose={() => setIsInventoryDetailModalOpen(false)}
                title="인벤토리"
            >
                <InventoryDetailInfo
                    inventoryItem={inventoryDetail}
                    hasRecipientInfo={!!recipientInfoData?.id}
                    onClose={() => setIsInventoryDetailModalOpen(false)}
                    onConfirm={handleUseInventoryItem}
                />
            </Modal>
        </main>
    )
}
