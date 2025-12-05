import React from 'react'
import styles from './Icon.module.css'

export type IconType = 'search' | 'copy' | 'chevron-down' | 'chevron-left' | 'chevron-right'

export interface IconProps {
  type: IconType
  size?: number
  className?: string
  onClick?: () => void
}

export const Icon: React.FC<IconProps> = ({
  type,
  size = 16,
  className = '',
  onClick,
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'search':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        )
      case 'copy':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )
      case 'chevron-down':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        )
      case 'chevron-left':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )
      case 'chevron-right':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        )
      default:
        return null
    }
  }

  const iconElement = (
    <span className={`${styles.icon} ${className}`} style={{ width: size, height: size }}>
      {renderIcon()}
    </span>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={styles.iconButton}
        onClick={onClick}
        style={{ width: size, height: size }}
      >
        {iconElement}
      </button>
    )
  }

  return iconElement
}

