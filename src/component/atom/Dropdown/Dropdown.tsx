import React, { useState, useRef, useEffect } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import styles from './Dropdown.module.css'
import clsx from 'clsx'

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = '선택하세요',
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    onChange?.(optionValue)
  }

  const selectedOption = options.find((opt) => opt.value === selectedValue)

  return (
    <div className={clsx(styles.dropdown, className)} ref={dropdownRef}>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.dropdownValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IconChevronDown size={16} stroke={2} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownItem} ${selectedValue === option.value ? styles.selected : ''
                }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

