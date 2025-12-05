import React, { useState, useEffect } from 'react'
import { Label } from '@/component/atom/Label/Label'
import { Input } from '@/component/atom/Input/Input'
import { Button } from '@/component/atom/Button/Button'
import { RecipientInfo } from '@/type/Inventory.type'
import styles from './RecipientInfoForm.module.css'
import clsx from 'clsx'


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

  // 휴대폰 인증 완료 여부
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)

  // 초기값이 변경되면 폼 데이터 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }))
      // 초기 데이터가 변경되면 휴대폰 인증 상태는 다시 초기화
      setIsPhoneVerified(false)
    }
  }, [initialData])

  // 한글만 허용하는 함수
  const handleNameChange = (value: string) => {
    const koreanCheck = value.replace(/[^ㄱ-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
    handleFieldChange('name', koreanCheck)
  }

  // 휴대폰 번호 포맷팅 함수 (000-0000-0000)
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '')
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
    }
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    handleFieldChange('phone', formatted)
    // 번호가 변경되면 다시 인증 필요
    if (isPhoneVerified) {
      setIsPhoneVerified(false)
    }
  }

  // 휴대폰 번호 형식 검증 (000-0000-0000)
  const isValidPhoneFormat = (phone: string): boolean => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/
    return phoneRegex.test(phone)
  }

  // 이메일 형식 검증
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 각 필드의 validation 상태 계산
  const isNameValid = formData.name.trim() !== ''
  const isEmailValid = formData.email.trim() !== '' && isValidEmail(formData.email)
  const isPhoneValid = isValidPhoneFormat(formData.phone) && isPhoneVerified
  const isPostalCodeValid = formData.postalCode.trim() !== ''
  const isAddressValid = formData.address.trim() !== ''

  // 각 필드의 에러 상태 (입력이 시작되었지만 유효하지 않은 경우)
  const nameError = formData.name.trim() !== '' && !isNameValid
  const emailError = formData.email.trim() !== '' && !isEmailValid
  const phoneError = formData.phone.trim() !== '' && (!isValidPhoneFormat(formData.phone) || !isPhoneVerified)
  const postalCodeError = formData.postalCode.trim() !== '' && !isPostalCodeValid
  const addressError = formData.address.trim() !== '' && !isAddressValid

  // 모든 필수 필드 검증
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

