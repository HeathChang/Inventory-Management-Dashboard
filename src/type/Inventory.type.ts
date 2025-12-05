export interface InventoryItem {
    id: number
    type: string
    filterType: string
    name: string
    imageUrl: string
    description: string
    validityPeriod: string
    message: string
}

export interface RecipientInfo {
    id: string
    name: string
    email: string
    phone: string
    postalCode: string
    address: string
    emailConsent: boolean
    kakaoConsent: boolean
    termsConsent: boolean
}