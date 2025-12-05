import React from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
}

export const Input: React.FC<InputProps> = ({
  error = false,
  success = false,
  className = '',
  ...props
}) => {
  return (
    <input
      className={clsx(styles.input, error && styles.error, success && styles.success, className)}
      {...props}
    />
  )
}

