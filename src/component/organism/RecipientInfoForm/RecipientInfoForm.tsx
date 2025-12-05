import React, { useState, useEffect } from 'react'
import { Label } from '@/component/atom/Label/Label'
import { Input } from '@/component/atom/Input/Input'
import { Button } from '@/component/atom/Button/Button'
import { RecipientInfo } from '@/type/Inventory.type'
import styles from './RecipientInfoForm.module.css'
import clsx from 'clsx'
import { isValidEmail, isValidPhoneFormat } from '@/util/validation'
import { formatPhoneNumber, filterKoreanOnly } from '@/util/formatting'


export interface RecipientInfoFormProps {
  initialData?: RecipientInfo
  onClose?: () => void
  onSave?: (data: RecipientInfo) => void
}

export const RecipientInfoForm: React.FC<RecipientInfoFormProps> = ({
  initialData,
  onSave,
  onClose,
}) => {

  const [formData, setFormData] = useState<RecipientInfo>({
    name: '',
    email: '',
    phone: '',
    postalCode: '',
    address: '',
    emailConsent: false,
    kakaoConsent: false,
    termsConsent: false
  })

  const [isPhoneVerified, setIsPhoneVerified] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }))
      setIsPhoneVerified(false)
    }
  }, [initialData])

  const handleNameChange = (value: string) => {
    const koreanCheck = filterKoreanOnly(value)
    handleFieldChange('name', koreanCheck)
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    handleFieldChange('phone', formatted)
    if (isPhoneVerified) {
      setIsPhoneVerified(false)
    }
  }

  const isNameValid = formData.name.trim() !== ''
  const isEmailValid = formData.email.trim() !== '' && isValidEmail(formData.email)
  const isPhoneValid = isValidPhoneFormat(formData.phone) && isPhoneVerified
  const isPostalCodeValid = formData.postalCode.trim() !== ''
  const isAddressValid = formData.address.trim() !== ''

  const nameError = formData.name.trim() !== '' && !isNameValid
  const emailError = formData.email.trim() !== '' && !isEmailValid
  const phoneError = formData.phone.trim() !== '' && (!isValidPhoneFormat(formData.phone) || !isPhoneVerified)
  const postalCodeError = formData.postalCode.trim() !== '' && !isPostalCodeValid
  const addressError = formData.address.trim() !== '' && !isAddressValid

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      isValidEmail(formData.email) &&
      isValidPhoneFormat(formData.phone) &&
      isPhoneVerified &&
      formData.postalCode.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.emailConsent &&
      formData.kakaoConsent &&
      formData.termsConsent
    )
  }

  const handleFieldChange = (field: keyof RecipientInfo, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (isFormValid()) {
      onSave?.(formData)
    }
  }

  const handlePhoneVerify = () => {
    if (!isValidPhoneFormat(formData.phone)) {
      alert('휴대폰 번호 형식이 올바르지 않습니다. (000-0000-0000)')
      return
    }
    setIsPhoneVerified(true)
  }


  return (
    <div className={styles.form}>
      <div className={styles.formField}>
        <Label required>이름</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className={styles.input}
          placeholder="한글만 입력이 가능합니다."
          error={nameError}
          success={isNameValid && !nameError}
        />
      </div>

      <div className={styles.formField}>
        <Label required>이메일</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          className={styles.input}
          error={emailError}
          success={isEmailValid && !emailError}
        />
      </div>

      <div className={styles.formField}>
        <Label required>휴대폰번호</Label>
        <div className={styles.inputWithButton}>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="000-0000-0000"
            maxLength={13}
            className={styles.input}
            error={phoneError}
            success={isPhoneValid && !phoneError}
          />
          <Button
            variant="secondary"
            size="medium"
            onClick={handlePhoneVerify}
            className={styles.verifyButton}
          >
            휴대폰인증
          </Button>
        </div>
      </div>

      <div className={styles.formField}>
        <Label required>주소</Label>
        <div className={styles.inputWithButton}>
          <Input
            type="text"
            value={formData.postalCode}
            onChange={(e) => handleFieldChange('postalCode', e.target.value)}
            placeholder="우편번호"
            className={styles.input}
            error={postalCodeError}
            success={isPostalCodeValid && !postalCodeError}
          />
          <Button
            variant="secondary"
            size="medium"
            className={styles.postalButton}
            disabled={true}
          >
            우편번호
          </Button>
        </div>
        <Input
          type="text"
          value={formData.address}
          onChange={(e) => handleFieldChange('address', e.target.value)}
          placeholder="주소"
          className={clsx(styles.input, styles.addressInput)}
          error={addressError}
          success={isAddressValid && !addressError}
        />
      </div>

      <div className={styles.formField}>
        <Label required>알림동의</Label>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.emailConsent}
              onChange={(e) => handleFieldChange('emailConsent', e.target.checked)}
              className={styles.checkbox}
            />
            <span>메일(필수)</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.kakaoConsent}
              onChange={(e) => handleFieldChange('kakaoConsent', e.target.checked)}
              className={styles.checkbox}
            />
            <span>카카오톡 알림톡(필수)</span>
          </label>
        </div>
      </div>

      <div className={styles.formField}>
        <Label required>이용약관</Label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={formData.termsConsent}
            onChange={(e) => handleFieldChange('termsConsent', e.target.checked)}
            className={styles.checkbox}
          />
          <span>안내 사항을 모두 확인 하였으며 이에 동의합니다.</span>
        </label>
      </div>
      <div className={styles.modalFooter}>
        <Button
          variant="ghost"
          size="medium"
          onClick={onClose}
          className={styles.closeButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={handleSave}
          className={styles.confirmButton}
          disabled={!isFormValid()}
        >
          확인
        </Button>
      </div>
    </div>
  )
}

