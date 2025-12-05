import React from 'react'
import { Label } from '@/component/atom/Label/Label'
import { EmptyImage } from '@/component/atom/EmptyImage/EmptyImage'
import styles from './InventoryContentArea.module.css'

export interface InventoryContentAreaProps {
  items?: any[]
  onItemClick: (item: any) => void
}

export const InventoryContentArea: React.FC<InventoryContentAreaProps> = ({
  items = [],
  onItemClick
}) => {

  return (
    <div className={styles.contentArea}>
      <div className={styles.resultCount}>
        <Label>총 {items.length}건 검색결과</Label>
      </div>
      {items.length > 0 ? (
        <div className={styles.itemList}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemCard} onClick={() => onItemClick(item)}>
              <img className={styles.itemCardImage} src={item.imageUrl} alt="item image" />
              <p className={styles.itemCardDescription}>{item.description}</p>
              <h3 className={styles.itemCardTitle}>{item.name}</h3>
              <p className={styles.itemCardValidityPeriod}>{item.validityPeriod}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <EmptyImage />
          <p className={styles.emptyStateMessage}>검색결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

