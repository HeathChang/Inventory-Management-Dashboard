"use client"
import React, { useState, useEffect } from 'react'
import { InventoryHeader } from '@/component/organism/InventoryHeader/InventoryHeader'
import { MainTabNavigation, MainTabType } from '@/component/organism/MainTabNavigation/MainTabNavigation'
import { AddressDisplay } from '@/component/organism/AddressDisplay/AddressDisplay'
import { FilterSection } from '@/component/organism/FilterSection/FilterSection'
import { InventoryContentArea } from '@/component/organism/InventoryContentArea/InventoryContentArea'
import { PaginationControls } from '@/component/organism/PaginationControls/PaginationControls'
import { Modal } from '@/component/atom/Modal/Modal'
import { ModalFooter } from '@/component/organism/ModalFooter/ModalFooter'
import { RecipientInfoForm } from '@/component/organism/RecipientInfoForm/RecipientInfoForm'
import { InventoryDetailInfo } from '@/component/organism/InventoryDetailInfo/InventoryDetailInfo'
import styles from './InventoryManagementContainer.module.css'
import { INVENTORY_FILTER_TYPE, INVENTORY_ITEM_TYPE, InventoryItemType } from '@/constant/Inventory.constant'
import { InventoryItem, RecipientInfo } from '@/type/Inventory.type'

const searchFilterOptions = [
    { value: 'productName', label: '상품명' },
]

// API 호출 함수들
const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
    try {
        const response = await fetch('/api/inventory')
        if (!response.ok) throw new Error('Failed to fetch inventory items')
        return await response.json()
    } catch (error) {
        console.error('Error fetching inventory items:', error)
        return []
    }
}

const deleteInventoryItem = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`/api/inventory/${id}`, {
            method: 'DELETE',
        })
        return response.ok
    } catch (error) {
        console.error('Error deleting inventory item:', error)
        return false
    }
}

const fetchRecipientInfo = async (): Promise<RecipientInfo | null> => {
    try {
        const response = await fetch('/api/recipient-info')
        if (!response.ok) throw new Error('Failed to fetch recipient info')
        const data = await response.json()
        if (!data.name && !data.email && !data.phone) {
            return null
        }
        return data
    } catch (error) {
        console.error('Error fetching recipient info:', error)
        return null
    }
}

const saveRecipientInfoAPI = async (data: RecipientInfo, isUpdate: boolean = false): Promise<RecipientInfo | null> => {
    try {
        const response = await fetch('/api/recipient-info', {
            method: isUpdate ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            const result = await response.json()
            return result.data || data
        }
        return null
    } catch (error) {
        console.error('Error saving recipient info:', error)
        return null
    }
}

const resetDataAPI = async (): Promise<boolean> => {
    try {
        const response = await fetch('/api/reset', {
            method: 'POST',
        })
        return response.ok
    } catch (error) {
        console.error('Error resetting data:', error)
        return false
    }
}

export const InventoryManagementContainer = () => {
    // 검색 관련 상태
    const [searchQuery, setSearchQuery] = useState('')
    const [searchFilter, setSearchFilter] = useState('productName')


    // 주소 관련 상태 (수령정보 ID)
    const [address, setAddress] = useState('')
    const [copied, setCopied] = useState(false)

    // 필터 및 정렬 상태
    const [activeFilter, setActiveFilter] = useState<INVENTORY_ITEM_TYPE>(INVENTORY_ITEM_TYPE.ALL)
    const [sortBy, setSortBy] = useState<INVENTORY_FILTER_TYPE>(INVENTORY_FILTER_TYPE.NEWEST)

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(1)

    // 데이터 상태
    const [items, setItems] = useState<any[]>([])

    // 검색 핸들러
    const handleSearch = () => {
        // 검색은 filteredItems에서 처리되므로 별도 로직 불필요
        // 검색 쿼리가 변경되면 자동으로 필터링됨
    }

    // 주소 복사 핸들러
    const handleCopyAddress = async () => {
        try {
            await navigator.clipboard.writeText(address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    // 모달 상태
    const [isRecipientInfoModalOpen, setIsRecipientInfoModalOpen] = useState(false)
    const [isInventoryDetailModalOpen, setIsInventoryDetailModalOpen] = useState(false)

    // 수령정보 초기값 (저장된 데이터가 있다면 여기에 설정)
    const [savedRecipientInfo, setSavedRecipientInfo] = useState({
        name: '',
        email: '',
        phone: '',
        postalCode: '',
        address: '',
        emailConsent: false,
        kakaoConsent: false,
        termsConsent: false,
    })

    // 인벤토리 상세 정보 상태 (예시 데이터)
    const [inventoryDetail, setInventoryDetail] = useState<InventoryItem | null>(null)

    // 수령정보 수정 핸들러
    const handleModifyReceipt = () => {
        setIsRecipientInfoModalOpen(true)
    }

    // 데이터 초기화 핸들러
    const handleReset = async () => {
        if (!confirm('모든 데이터를 초기 상태로 되돌리시겠습니까?')) {
            return
        }

        const success = await resetDataAPI()

        if (success) {
            // 데이터 다시 로드
            const inventoryItems = await fetchInventoryItems()
            setItems(inventoryItems)

            const recipientInfo = await fetchRecipientInfo()
            if (recipientInfo) {
                setSavedRecipientInfo(recipientInfo)
                if (recipientInfo.id) {
                    setAddress(recipientInfo.id)
                } else {
                    setAddress('')
                }
            } else {
                setSavedRecipientInfo({
                    name: '',
                    email: '',
                    phone: '',
                    postalCode: '',
                    address: '',
                    emailConsent: false,
                    kakaoConsent: false,
                    termsConsent: false,
                })
                setAddress('')
            }

            alert('데이터가 초기화되었습니다.')
        } else {
            alert('데이터 초기화에 실패했습니다.')
        }
    }

    // 수령정보 모달 닫기
    const handleCloseRecipientInfoModal = () => {
        setIsRecipientInfoModalOpen(false)
    }


    // 수령정보 모달 확인 (저장된 데이터를 받아서 처리)
    const handleSaveRecipientInfo = async (data: RecipientInfo) => {
        const isUpdate = savedRecipientInfo.name !== '' || savedRecipientInfo.email !== ''
        const savedData = await saveRecipientInfoAPI(data, isUpdate)

        if (savedData) {
            setSavedRecipientInfo(savedData)
            // 저장된 ID를 주소 필드에 표시
            if (savedData.id) {
                setAddress(savedData.id)
            } else {
                setAddress('')
            }
            setIsRecipientInfoModalOpen(false)
        } else {
            alert('수령정보 저장에 실패했습니다.')
        }
    }


    // 인벤토리 상세 모달 열기
    const handleOpenInventoryDetail = () => {
        setIsInventoryDetailModalOpen(true)
    }

    // 인벤토리 상세 모달 닫기
    const handleCloseInventoryDetailModal = () => {
        setIsInventoryDetailModalOpen(false)
    }

    // 인벤토리 상세 모달 사용하기
    const handleUseInventoryItem = async () => {
        if (!inventoryDetail) return

        const success = await deleteInventoryItem(inventoryDetail.id)

        if (success) {
            // 아이템 목록에서 제거
            setItems((prev) => prev.filter((item) => item.id !== inventoryDetail.id))
            setIsInventoryDetailModalOpen(false)
        } else {
            alert('아이템 사용에 실패했습니다.')
        }
    }

    // 수령정보 폼 핸들러들
    const handlePhoneVerify = () => {
        // TODO: 휴대폰 인증 API 호출
        console.log('휴대폰 인증')
    }

    const handlePostalCodeSearch = () => {
        // TODO: 우편번호 검색 API 호출
        console.log('우편번호 검색')
    }

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // TODO: 페이지 변경 시 데이터 다시 로드
    }

    // 아이템 클릭시, 사용 모달 노출
    const handleItemClick = (item: any) => {
        console.log('아이템 클릭:', item);
        setInventoryDetail(item);
        setIsInventoryDetailModalOpen(true)
    }

    // 필터/정렬 변경 시 페이지 리셋
    useEffect(() => {
        setCurrentPage(1)
        // TODO: 필터/정렬 변경 시 데이터 다시 로드
    }, [activeFilter, sortBy])

    // 초기 데이터 로드
    useEffect(() => {
        const loadData = async () => {
            // 인벤토리 아이템 로드
            const inventoryItems = await fetchInventoryItems()
            setItems(inventoryItems)

            // 수령정보 로드
            const recipientInfo = await fetchRecipientInfo()
            if (recipientInfo) {
                setSavedRecipientInfo(recipientInfo)
                // ID가 있으면 주소 필드에 표시
                if (recipientInfo.id) {
                    setAddress(recipientInfo.id)
                } else {
                    setAddress('')
                }
            } else {
                setAddress('')
            }
        }

        loadData()
    }, [])

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

            const matchesSearch = searchQuery.trim() === '' ||
                (searchFilter === 'productName' && item.name.toLowerCase().includes(searchQuery.toLowerCase()))

            return matchesFilter && matchesSearch
        })
        .sort((a, b) => {
            const aTime = new Date(a.validityPeriod).getTime()
            const bTime = new Date(b.validityPeriod).getTime()

            if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
                return 0
            }

            // 최신획득순: 최근 날짜가 먼저, 오래된 순: 오래된 날짜가 먼저
            return sortBy === INVENTORY_FILTER_TYPE.NEWEST ? bTime - aTime : aTime - bTime
        })


    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <InventoryHeader onReset={handleReset} />
            </div>

            <div className={styles.container}>
                <AddressDisplay
                    address={address}
                    copied={copied}
                    onCopy={handleCopyAddress}
                    onModifyReceipt={handleModifyReceipt}
                />
            </div>
            <div className={styles.container}>
                <FilterSection
                    activeFilter={activeFilter}
                    sortBy={sortBy}
                    onFilterChange={setActiveFilter}
                    onSortChange={setSortBy}
                    searchQuery={searchQuery}
                    searchFilter={searchFilter}
                    searchFilterOptions={searchFilterOptions}
                    onSearchQueryChange={setSearchQuery}
                    onSearchFilterChange={setSearchFilter}
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
                onClose={handleCloseRecipientInfoModal}
                title="수령정보입력"
            >
                <RecipientInfoForm
                    initialData={savedRecipientInfo}
                    onPhoneVerify={handlePhoneVerify}
                    onPostalCodeSearch={handlePostalCodeSearch}
                    onSave={handleSaveRecipientInfo}
                    onClose={handleCloseRecipientInfoModal}
                />
            </Modal>

            {/* 인벤토리 상세 모달 */}
            <Modal
                isOpen={isInventoryDetailModalOpen}
                onClose={handleCloseInventoryDetailModal}
                title="인벤토리"
            >
                <InventoryDetailInfo
                    inventoryItem={inventoryDetail}
                    onClose={handleCloseInventoryDetailModal}
                    onConfirm={handleUseInventoryItem}
                />
            </Modal>
        </main>
    )
}
