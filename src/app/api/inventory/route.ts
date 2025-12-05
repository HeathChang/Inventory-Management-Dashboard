import { NextRequest, NextResponse } from 'next/server'
import { getInventoryItems, saveInventoryItems, deleteInventoryItem } from '@/lib/fileStorage'
import { InventoryItem } from '@/type/Inventory.type'

// GET: 인벤토리 아이템 목록 조회
export async function GET() {
    try {
        const items = getInventoryItems()
        return NextResponse.json(items, { status: 200 })
    } catch (error) {
        console.error('Error fetching inventory items:', error)
        return NextResponse.json(
            { error: 'Failed to fetch inventory items' },
            { status: 500 }
        )
    }
}

