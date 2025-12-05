import { NextRequest, NextResponse } from 'next/server'
import { getInventoryItems } from '@/lib/fileStorage'
import { InventoryItem } from '@/type/Inventory.type'
import { INVENTORY_ITEM_TYPE, INVENTORY_FILTER_TYPE, SEARCH_FILTER_TYPE, InventoryItemType } from '@/constant/Inventory.constant'

// GET: 인벤토리 아이템 목록 조회 (서버 사이드 필터링/정렬/페이지네이션)
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        
        // 파라미터 추출
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = parseInt(searchParams.get('limit') || '10', 10)
        const filterTypeNum = parseInt(searchParams.get('filterType') || '0', 10)
        const sortByNum = parseInt(searchParams.get('sortBy') || '0', 10)
        const searchQuery = searchParams.get('searchQuery') || ''
        const searchFilterNum = parseInt(searchParams.get('searchFilter') || '0', 10)
        
        // enum 값으로 변환
        const filterType = filterTypeNum as INVENTORY_ITEM_TYPE
        const sortBy = sortByNum as INVENTORY_FILTER_TYPE
        const searchFilter = searchFilterNum as SEARCH_FILTER_TYPE
        
        // 전체 아이템 가져오기
        const allItems = getInventoryItems()
        
        // 필터링
        let filteredItems = allItems.filter((item: InventoryItem) => {
            // 필터 타입 매칭
            const matchesFilter = (() => {
                switch (filterType) {
                    case INVENTORY_ITEM_TYPE.GIFTICON:
                        return item.filterType === InventoryItemType[INVENTORY_ITEM_TYPE.GIFTICON]
                    case INVENTORY_ITEM_TYPE.DELIVERY:
                        return item.filterType === InventoryItemType[INVENTORY_ITEM_TYPE.DELIVERY]
                    default:
                        return true
                }
            })()
            
            // 검색 매칭
            const matchesSearch = searchQuery.trim() === '' ||
                (searchFilter === SEARCH_FILTER_TYPE.PRODUCT_NAME && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            
            return matchesFilter && matchesSearch
        })
        
        // 정렬
        filteredItems.sort((a: InventoryItem, b: InventoryItem) => {
            const aTime = new Date(a.validityPeriod).getTime()
            const bTime = new Date(b.validityPeriod).getTime()
            
            if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
                return 0
            }
            
            return sortBy === INVENTORY_FILTER_TYPE.NEWEST ? bTime - aTime : aTime - bTime
        })
        
        // 총 개수 및 페이지 수 계산
        const totalItems = filteredItems.length
        const totalPages = Math.ceil(totalItems / limit)
        
        // 페이지네이션 적용
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedItems = filteredItems.slice(startIndex, endIndex)
        
        return NextResponse.json({
            items: paginatedItems,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
        }, { status: 200 })
    } catch (error) {
        console.error('Error fetching inventory items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch inventory items' },
            { status: 500 }
        )
    }
}

