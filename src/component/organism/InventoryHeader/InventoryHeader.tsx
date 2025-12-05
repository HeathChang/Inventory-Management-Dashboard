import React from 'react'
import { Breadcrumb } from '@/component/atom/Breadcrumb/Breadcrumb'
import { Button } from '@/component/atom/Button/Button'
import styles from './InventoryHeader.module.css'

export interface InventoryHeaderProps {
  onReset?: () => void
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({ onReset }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Breadcrumb
          items={[
            { label: '내정보' },
            { label: '인벤토리' },
          ]}
        />
      </div>
      {onReset && (
        <div className={styles.rightSection}>
          <Button
            variant="secondary"
            size="medium"
            onClick={onReset}
            className={styles.resetButton}
          >
            초기화
          </Button>
        </div>
      )}
    </header>
  )
}

