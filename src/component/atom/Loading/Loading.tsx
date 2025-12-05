import React from 'react'
import styles from './Loading.module.css'

export interface LoadingProps {
  className?: string
}

export const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.loading} ${className}`}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>로딩 중...</p>
    </div>
  )
}

