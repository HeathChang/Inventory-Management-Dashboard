import { NextRequest, NextResponse } from 'next/server'
import { getRecipientInfo, saveRecipientInfo } from '@/lib/fileStorage'
import { RecipientInfo } from '@/type/Inventory.type'
import { generateRandomId } from '@/util/generateRandomId'

export async function GET() {
    try {
        const info = getRecipientInfo()
        return NextResponse.json(info, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch recipient info' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: RecipientInfo = await request.json()

        const dataWithId: RecipientInfo = {
            ...body,
            id: generateRandomId()
        }

        const success = saveRecipientInfo(dataWithId)

        if (success) {
            return NextResponse.json(
                { message: 'Recipient info saved successfully', data: dataWithId },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { error: 'Failed to save recipient info' },
                { status: 500 }
            )
        }
    } catch {
        return NextResponse.json(
            { error: 'Failed to save recipient info' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body: RecipientInfo = await request.json()

        const existingInfo = getRecipientInfo()

        const dataWithId: RecipientInfo = {
            ...body,
            id: body.id || existingInfo?.id || generateRandomId()
        }

        const success = saveRecipientInfo(dataWithId)

        if (success) {
            return NextResponse.json(
                { message: 'Recipient info updated successfully', data: dataWithId },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { error: 'Failed to update recipient info' },
                { status: 500 }
            )
        }
    } catch {
        return NextResponse.json(
            { error: 'Failed to update recipient info' },
            { status: 500 }
        )
    }
}

