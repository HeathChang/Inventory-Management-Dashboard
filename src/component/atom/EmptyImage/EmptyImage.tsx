import React from 'react'
import styles from './EmptyImage.module.css'
import clsx from 'clsx'

export interface EmptyImageProps {
  className?: string
}

export const EmptyImage: React.FC<EmptyImageProps> = ({
  className = '',
}) => {
  return (
    <div className={clsx(styles.EmptyImage, className)}>
      <img src="https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/errorcat2.png" alt="Empty State" width={200} height={200} />
    </div>
  )
}

