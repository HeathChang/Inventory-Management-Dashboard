import { NextRequest, NextResponse } from 'next/server'
import { resetData } from '@/lib/fileStorage'

// POST: 데이터 초기화
export async function POST() {
    try {
        const success = resetData()

        if (success) {
            return NextResponse.json(
                { message: 'Data reset successfully' },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { error: 'Failed to reset data' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error resetting data:', error)
        return NextResponse.json(
            { error: 'Failed to reset data' },
            { status: 500 }
        )
    }
}

