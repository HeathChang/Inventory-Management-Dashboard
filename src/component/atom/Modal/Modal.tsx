import React from 'react'
import styles from './Modal.module.css'
import clsx from 'clsx'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    className?: string
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    className = '',
}) => {
    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={clsx(styles.modalContainer, className)} onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{title}</h2>
                    </div>
                )}
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}

