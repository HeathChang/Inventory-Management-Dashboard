export enum INVENTORY_ITEM_TYPE {
    ALL,
    GIFTICON,
    DELIVERY
}

export enum INVENTORY_FILTER_TYPE {
    NEWEST,
    OLDEST
}

export enum SEARCH_FILTER_TYPE {
    PRODUCT_NAME
}

export const InventoryItemType = {
    [INVENTORY_ITEM_TYPE.ALL]: '전체아이템',
    [INVENTORY_ITEM_TYPE.GIFTICON]: '기프티콘',
    [INVENTORY_ITEM_TYPE.DELIVERY]: '배송아이템',
} as const

export const InventoryFilterType = {
    [INVENTORY_FILTER_TYPE.NEWEST]: '최신획득 순',
    [INVENTORY_FILTER_TYPE.OLDEST]: '오래된 순',
} as const

export const SearchFilterType = {
    [SEARCH_FILTER_TYPE.PRODUCT_NAME]: '상품명',
} as const

export const defaultRecipientInfo = {
    id: '',
    name: '',
    email: '',
    phone: '',
    postalCode: '',
    address: '',
    emailConsent: false,
    kakaoConsent: false,
    termsConsent: false,
}

export const ITEMS_PER_PAGE = 10