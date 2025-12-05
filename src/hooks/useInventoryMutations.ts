import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteInventoryItem, resetData } from '@/lib/api/inventory.api'

export const useDeleteInventoryItem = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteInventoryItem,
    onSuccess: () => {
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

