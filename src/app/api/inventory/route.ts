import { NextRequest, NextResponse } from 'next/server'
import { getInventoryItems } from '@/lib/fileStorage'
import { InventoryItem } from '@/type/Inventory.type'
import { INVENTORY_ITEM_TYPE, INVENTORY_FILTER_TYPE, SEARCH_FILTER_TYPE, InventoryItemType } from '@/constant/Inventory.constant'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = parseInt(searchParams.get('limit') || '10', 10)
        const filterTypeNum = parseInt(searchParams.get('filterType') || '0', 10)
        const sortByNum = parseInt(searchParams.get('sortBy') || '0', 10)
        const searchQuery = searchParams.get('searchQuery') || ''
        const searchFilterNum = parseInt(searchParams.get('searchFilter') || '0', 10)

        const filterType = filterTypeNum as INVENTORY_ITEM_TYPE
        const sortBy = sortByNum as INVENTORY_FILTER_TYPE
        const searchFilter = searchFilterNum as SEARCH_FILTER_TYPE

        const allItems = getInventoryItems()

        let filteredItems = allItems.filter((item: InventoryItem) => {
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

            const matchesSearch = searchQuery.trim() === '' ||
                (searchFilter === SEARCH_FILTER_TYPE.PRODUCT_NAME && item.name.toLowerCase().includes(searchQuery.toLowerCase()))

            return matchesFilter && matchesSearch
        })

        filteredItems.sort((a: InventoryItem, b: InventoryItem) => {
            const aTime = new Date(a.validityPeriod).getTime()
            const bTime = new Date(b.validityPeriod).getTime()

            if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
                return 0
            }

            return sortBy === INVENTORY_FILTER_TYPE.NEWEST ? bTime - aTime : aTime - bTime
        })

        const totalItems = filteredItems.length
        const totalPages = Math.ceil(totalItems / limit)

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
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch inventory items' },
            { status: 500 }
        )
    }
}

