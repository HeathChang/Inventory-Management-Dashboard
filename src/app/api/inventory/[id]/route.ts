import { NextRequest, NextResponse } from 'next/server'
import { deleteInventoryItem, getInventoryItems, saveInventoryItems } from '@/lib/fileStorage'

// DELETE: 인벤토리 아이템 삭제 (사용하기)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid item ID' },
                { status: 400 }
            )
        }

        const success = deleteInventoryItem(id)

        if (success) {
            return NextResponse.json(
                { message: 'Item deleted successfully' },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { error: 'Failed to delete item' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error deleting inventory item:', error)
        return NextResponse.json(
            { error: 'Failed to delete inventory item' },
            { status: 500 }
        )
    }
}

