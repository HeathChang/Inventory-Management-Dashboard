import React from 'react'
import styles from './Tab.module.css'

export interface TabProps {
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export const Tab: React.FC<TabProps> = ({
  label,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`${styles.tab} ${isActive ? styles.active : ''} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

