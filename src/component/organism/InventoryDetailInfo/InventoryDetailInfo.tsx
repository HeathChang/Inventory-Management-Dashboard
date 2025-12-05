import React from 'react'
import { Label } from '@/component/atom/Label/Label'
import { Input } from '@/component/atom/Input/Input'
import styles from './InventoryDetailInfo.module.css'
import { InventoryItem } from '@/type/Inventory.type'
import { InventoryItemType } from '@/constant/Inventory.constant'
import { Button } from '@/component/atom/Button/Button'

export interface InventoryDetailInfoProps {
  inventoryItem: InventoryItem | null
  onClose?: () => void
  onConfirm?: (inventoryItem: InventoryItem) => void
}

export const InventoryDetailInfo: React.FC<InventoryDetailInfoProps> = ({
  inventoryItem,
  onClose,
  onConfirm,
}) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <Label className={styles.infoLabel}>종류</Label>
          <Input
            type="text"
            readOnly
            value={inventoryItem?.type ?? ''}
            className={styles.infoInput}
          />
        </div>
        <div className={styles.infoRow}>
          <Label className={styles.infoLabel}>상품명</Label>
          <Input
            type="text"
            readOnly
            value={inventoryItem?.name ?? ''}
            className={styles.infoInput}
          />
        </div>
        <div className={styles.infoRow}>
          <Label className={styles.infoLabel}>상품설명</Label>
          <Input
            type="text"
            readOnly
            value={inventoryItem?.description ?? ''}
            className={styles.infoInput}
          />
        </div>
        <div className={styles.infoRow}>
          <Label className={styles.infoLabel}>유효기간</Label>
          <Input
            type="text"
            readOnly
            value={inventoryItem?.validityPeriod ?? ''}
            className={styles.infoInput}
          />
        </div>
        <div className={styles.infoRow}>
          <Label className={styles.infoLabel}>메세지</Label>
          <Input
            type="text"
            readOnly
            value={inventoryItem?.message ?? ''}
            className={styles.infoInput}
          />
        </div>
      </div>
      <div className={styles.warningBox}>
        아이템은 수령 정보 입력 후, 사용/선물이 가능합니다.
      </div>
      <div className={styles.modalFooter}>
        <Button
          variant="ghost"
          size="medium"
          onClick={onClose}
          className={styles.closeButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={() => {
            if (inventoryItem) {
              onConfirm?.(inventoryItem)
            }
          }}
          className={styles.confirmButton}
        >
          사용하기
        </Button>
      </div>
    </div>
  )
}

