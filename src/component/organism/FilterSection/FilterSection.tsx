import React from 'react'
import { Dropdown, DropdownOption } from '@/component/atom/Dropdown/Dropdown'
import { Tab } from '@/component/atom/Tab/Tab'
import { Input } from '@/component/atom/Input/Input'
import { Button } from '@/component/atom/Button/Button'
import { Icon } from '@/component/atom/Icon/Icon'
import { INVENTORY_ITEM_TYPE, INVENTORY_FILTER_TYPE, InventoryItemType, InventoryFilterType } from '@/constant/Inventory.constant'
import styles from './FilterSection.module.css'

export type FilterTabType = INVENTORY_ITEM_TYPE
export type SortType = INVENTORY_FILTER_TYPE

export interface FilterSectionProps {
  activeFilter: FilterTabType
  sortBy: SortType
  onFilterChange: (filter: FilterTabType) => void
  onSortChange: (sort: SortType) => void
  searchQuery: string
  searchFilter: string
  searchFilterOptions: DropdownOption[]
  onSearchQueryChange: (query: string) => void
  onSearchFilterChange: (filter: string) => void
  onSearch: () => void
}

const filterTabs: { value: FilterTabType; label: string }[] = [
  { value: INVENTORY_ITEM_TYPE.ALL, label: InventoryItemType[INVENTORY_ITEM_TYPE.ALL] },
  { value: INVENTORY_ITEM_TYPE.GIFTICON, label: InventoryItemType[INVENTORY_ITEM_TYPE.GIFTICON] },
  { value: INVENTORY_ITEM_TYPE.DELIVERY, label: InventoryItemType[INVENTORY_ITEM_TYPE.DELIVERY] }
]

const sortOptions: { value: string; label: string }[] = [
  { value: INVENTORY_FILTER_TYPE.NEWEST.toString(), label: InventoryFilterType[INVENTORY_FILTER_TYPE.NEWEST] },
  { value: INVENTORY_FILTER_TYPE.OLDEST.toString(), label: InventoryFilterType[INVENTORY_FILTER_TYPE.OLDEST] },
]

export const FilterSection: React.FC<FilterSectionProps> = ({
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
  searchQuery,
  searchFilter,
  searchFilterOptions,
  onSearchQueryChange,
  onSearchFilterChange,
  onSearch,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className={styles.filterSection}>
      <div className={styles.searchSortWrapper}>
        <div className={styles.sortWrapper}>
          <Dropdown
            options={sortOptions}
            value={sortBy.toString()}
            onChange={(value) => onSortChange(Number(value) as SortType)}
            className={styles.sortDropdown}
          />
        </div>
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <Dropdown
              options={searchFilterOptions}
              value={searchFilter}
              onChange={onSearchFilterChange}
              className={styles.searchFilter}
            />
            <Input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.searchInput}
            />
            <Icon type="search" size={16} className={styles.searchIcon} />
          </div>
        </div>

      </div>
      <div className={styles.filterTabs}>
        {filterTabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            isActive={activeFilter === tab.value}
            onClick={() => onFilterChange(tab.value)}
          />
        ))}
      </div>
    </div>
  )
}

