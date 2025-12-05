import React from 'react'
import styles from './Label.module.css'
import clsx from 'clsx'
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  )
}

