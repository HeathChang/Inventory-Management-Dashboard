import React from 'react'
import styles from './Card.module.css'

export interface CardProps {
  imageUrl: string
  name: string
  description: string
  validityPeriod: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  imageUrl,
  name,
  description,
  validityPeriod,
  onClick
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.cardImage} src={imageUrl} alt={name} />
      <p className={styles.cardDescription}>{description}</p>
      <h3 className={styles.cardTitle}>{name}</h3>
      <p className={styles.cardValidityPeriod}>{validityPeriod}</p>
    </div>
  )
}

