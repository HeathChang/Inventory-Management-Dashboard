import React from 'react'
import { Tab } from '@/component/atom/Tab/Tab'
import styles from './MainTabNavigation.module.css'

export type MainTabType = 'unused' | 'used' | 'order-history'

export interface MainTabNavigationProps {
  activeTab: MainTabType
  onTabChange: (tab: MainTabType) => void
}

const tabs: { value: MainTabType; label: string }[] = [
  { value: 'unused', label: '미사용' },
  { value: 'used', label: '사용완료' },
  { value: 'order-history', label: '주문내역' },
]

export const MainTabNavigation: React.FC<MainTabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className={styles.tabNavigation}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          label={tab.label}
          isActive={activeTab === tab.value}
          onClick={() => onTabChange(tab.value)}
        />
      ))}
    </nav>
  )
}

