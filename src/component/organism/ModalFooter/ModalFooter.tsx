import React from 'react'
import { Button } from '@/component/atom/Button/Button'
import styles from './ModalFooter.module.css'

export interface ModalFooterProps {
  onClose: () => void
  onConfirm: () => void
  closeLabel?: string
  confirmLabel?: string

  confirmVariant?: 'primary' | 'secondary'
  showClose?: boolean
  showConfirm?: boolean
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  onClose,
  onConfirm,
  closeLabel = '닫기',
  confirmLabel = '확인',
  confirmVariant = 'primary',
  showClose = true,
  showConfirm = true,
}) => {
  return (
    <div className={styles.modalFooter}>
      {showClose && (
        <Button
          variant="ghost"
          size="medium"
          onClick={onClose}
          className={styles.closeButton}
        >
          {closeLabel}
        </Button>
      )}
      {showConfirm && (
        <Button
          variant={confirmVariant}
          size="medium"
          onClick={onConfirm}
          className={styles.confirmButton}
          style={confirmVariant === 'primary' ? { backgroundColor: '#60a5fa' } : undefined}
        >
          {confirmLabel}
        </Button>
      )}
    </div>
  )
}

