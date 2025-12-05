import { NextResponse } from 'next/server'
import { resetData } from '@/lib/fileStorage'

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
    } catch {
        return NextResponse.json(
            { error: 'Failed to reset data' },
            { status: 500 }
        )
    }
}

