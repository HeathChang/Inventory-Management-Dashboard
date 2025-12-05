import React from 'react'
import { Label } from '@/component/atom/Label/Label'
import { Input } from '@/component/atom/Input/Input'
import { Icon } from '@/component/atom/Icon/Icon'
import styles from './AddressDisplay.module.css'
import { Button } from '@/component/atom/Button/Button'

export interface AddressDisplayProps {
    address: string
    copied?: boolean
    onCopy: () => void
    onModifyReceipt: () => void
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
    address,
    copied = false,
    onCopy,
    onModifyReceipt
}) => {
    return (
        <div className={styles.addressSection}>
            <Label className={styles.addressLabel}>내주소</Label>
            <div className={styles.addressWrapper}>
                <div className={styles.addressInputWrapper}>
                    {address && <Icon type="copy" size={16} onClick={onCopy} className={styles.copyIcon} />}
                    <Input
                        type="text"
                        value={address}
                        readOnly
                        className={styles.addressInput}
                    />
                    {copied && <span className={styles.copiedText}>복사됨!</span>}
                </div>
                <Button
                    variant="primary"
                    size="medium"
                    onClick={onModifyReceipt}
                    className={styles.modifyButton}
                >
                    {address ? '수령정보수정' : '수령정보입력'}
                </Button>
            </div>
        </div>
    )
}

