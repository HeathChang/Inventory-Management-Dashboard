import { InventoryItem, RecipientInfo } from '@/type/Inventory.type'
import { INVENTORY_ITEM_TYPE, INVENTORY_FILTER_TYPE, SEARCH_FILTER_TYPE } from '@/constant/Inventory.constant'

export interface PaginatedInventoryResponse {
  items: InventoryItem[]
  pagination: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export interface FetchInventoryParams {
  page: number
  limit: number
  filterType: INVENTORY_ITEM_TYPE
  sortBy: INVENTORY_FILTER_TYPE
  searchQuery: string
  searchFilter: SEARCH_FILTER_TYPE
}

// 인벤토리 아이템 목록 조회 (서버 사이드 필터링/정렬/페이지네이션)
export const fetchInventoryItems = async (
  params: FetchInventoryParams
): Promise<PaginatedInventoryResponse> => {
  try {
    const { page, limit, filterType, sortBy, searchQuery, searchFilter } = params

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      filterType: filterType.toString(),
      sortBy: sortBy.toString(),
      searchQuery: searchQuery,
      searchFilter: searchFilter.toString(),
    })

    const response = await fetch(`/api/inventory?${queryParams.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch inventory items')
    return await response.json()
  } catch (error) {
    console.error('Error fetching inventory items:', error)
    return {
      items: [],
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 0,
      },
    }
  }
}

// 인벤토리 아이템 삭제
export const deleteInventoryItem = async (id: number): Promise<boolean> => {
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

// 수령정보 조회
export const fetchRecipientInfo = async (): Promise<RecipientInfo | null> => {
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

// 수령정보 저장/수정
export const saveRecipientInfo = async (
  data: RecipientInfo,
  isUpdate: boolean = false
): Promise<RecipientInfo | null> => {
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

// 데이터 초기화
export const resetData = async (): Promise<boolean> => {
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

