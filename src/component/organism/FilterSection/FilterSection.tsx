import React, { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { Dropdown, DropdownOption } from '@/component/atom/Dropdown/Dropdown'
import { Tab } from '@/component/atom/Tab/Tab'
import { Input } from '@/component/atom/Input/Input'
import { Button } from '@/component/atom/Button/Button'
import { INVENTORY_ITEM_TYPE, INVENTORY_FILTER_TYPE, SEARCH_FILTER_TYPE, InventoryItemType, InventoryFilterType, SearchFilterType } from '@/constant/Inventory.constant'
import styles from './FilterSection.module.css'

export type FilterTabType = INVENTORY_ITEM_TYPE
export type SortType = INVENTORY_FILTER_TYPE
export type SearchFilterTabType = SEARCH_FILTER_TYPE

export interface FilterSectionProps {
  activeFilter: FilterTabType
  sortBy: SortType
  onFilterChange: (filter: FilterTabType) => void
  onSortChange: (sort: SortType) => void
  onSearch: (query: string, filter: string) => void
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

const searchFilterOptions: DropdownOption[] = [
  { value: SEARCH_FILTER_TYPE.PRODUCT_NAME.toString(), label: SearchFilterType[SEARCH_FILTER_TYPE.PRODUCT_NAME] },
]

export const FilterSection: React.FC<FilterSectionProps> = ({
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState<SearchFilterTabType>(SEARCH_FILTER_TYPE.PRODUCT_NAME)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery, searchFilter.toString())
    }
  }

  const handleSearchClick = () => {
    onSearch(searchQuery, searchFilter.toString())
  }

  const handleSearchFilterChange = (value: string) => {
    setSearchFilter(Number(value) as SearchFilterTabType)
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
              value={searchFilter.toString()}
              onChange={handleSearchFilterChange}
              className={styles.searchFilter}
            />
            <Input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.searchInput}
            />
            <IconSearch
              size={16}
              stroke={2}
              className={styles.searchIcon}
              onClick={handleSearchClick}
              style={{ cursor: 'pointer' }}
            />
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

