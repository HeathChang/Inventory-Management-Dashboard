import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveRecipientInfo } from '@/lib/api/inventory.api'
import { RecipientInfo } from '@/type/Inventory.type'

export const useSaveRecipientInfo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, isUpdate }: { data: RecipientInfo; isUpdate: boolean }) =>
      saveRecipientInfo(data, isUpdate),
    onSuccess: (savedData) => {
      if (savedData) {
        queryClient.invalidateQueries({ queryKey: ['recipient-info'] })
        onSuccess?.()
      } else {
        alert('수령정보 저장에 실패했습니다.')
      }
    },
    onError: () => {
      alert('수령정보 저장에 실패했습니다.')
    },
  })
}

