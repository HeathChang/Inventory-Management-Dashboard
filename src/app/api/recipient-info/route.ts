import { NextRequest, NextResponse } from 'next/server'
import { getRecipientInfo, saveRecipientInfo } from '@/lib/fileStorage'
import { RecipientInfo } from '@/type/Inventory.type'
import { generateRandomId } from '@/util/generateRandomId'

// GET: 수령정보 조회
export async function GET() {
    try {
        const info = getRecipientInfo()
        return NextResponse.json(info, { status: 200 })
    } catch (error) {
        console.error('Error fetching recipient info:', error)
        return NextResponse.json(
            { error: 'Failed to fetch recipient info' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: RecipientInfo = await request.json()

        // 신규 저장 시 ID 생성
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
    } catch (error) {
        console.error('Error saving recipient info:', error)
        return NextResponse.json(
            { error: 'Failed to save recipient info' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body: RecipientInfo = await request.json()

        // 기존 정보 가져오기
        const existingInfo = getRecipientInfo()

        // ID가 없으면 생성 (기존 데이터에 ID가 없는 경우)
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
    } catch (error) {
        console.error('Error updating recipient info:', error)
        return NextResponse.json(
            { error: 'Failed to update recipient info' },
            { status: 500 }
        )
    }
}

