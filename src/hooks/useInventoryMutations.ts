import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteInventoryItem, resetData } from '@/lib/api/inventory.api'

export const useDeleteInventoryItem = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteInventoryItem,
    onSuccess: () => {
      // 삭제 시 모든 인벤토리 관련 쿼리 캐시 무효화 (모든 페이지, 필터, 정렬 조합)
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      onSuccess?.()
    },
    onError: () => {
      alert('아이템 사용에 실패했습니다.')
    },
  })
}

export const useResetData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: resetData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      queryClient.invalidateQueries({ queryKey: ['recipient-info'] })
      alert('데이터가 초기화되었습니다.')
    },
    onError: () => {
      alert('데이터 초기화에 실패했습니다.')
    },
  })
}

