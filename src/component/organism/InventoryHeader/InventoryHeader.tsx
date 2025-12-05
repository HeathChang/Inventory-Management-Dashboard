'use client'

import React from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { Breadcrumb } from '@/component/atom/Breadcrumb/Breadcrumb'
import { Button } from '@/component/atom/Button/Button'
import { useTheme } from '@/context/ThemeContext'
import styles from './InventoryHeader.module.css'

export interface InventoryHeaderProps {
  onReset?: () => void
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({ onReset }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Breadcrumb
          items={[
            { label: '내정보' },
            { label: '인벤토리' },
          ]}
        />
      </div>
      <div className={styles.rightSection}>
        <Button
          variant="ghost"
          size="medium"
          onClick={toggleTheme}
          className={styles.themeToggleButton}
          aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
        >
          {theme === 'light' ? (
            <IconMoon size={20} stroke={2} />
          ) : (
            <IconSun size={20} stroke={2} />
          )}
        </Button>
        {onReset && (
          <Button
            variant="secondary"
            size="medium"
            onClick={onReset}
            className={styles.resetButton}
          >
            초기화
          </Button>
        )}
      </div>
    </header>
  )
}

