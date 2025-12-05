import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { Button } from '@/component/atom/Button/Button'
import styles from './PaginationControls.module.css'

export interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div className={styles.pagination}>
      <Button
        variant="ghost"
        size="small"
        onClick={() => onPageChange(1)}
        disabled={!canGoPrevious}
        className={styles.pageButton}
      >
        K
      </Button>
      <Button
        variant="ghost"
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={styles.pageButton}
      >
        <IconChevronLeft size={16} stroke={2} />
      </Button>
      <div className={styles.pageNumber}>
        <span className={styles.currentPage}>{currentPage}</span>
      </div>
      <Button
        variant="ghost"
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={styles.pageButton}
      >
        <IconChevronRight size={16} stroke={2} />
      </Button>
      <Button
        variant="ghost"
        size="small"
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
        className={styles.pageButton}
      >
        I
      </Button>
    </div>
  )
}

