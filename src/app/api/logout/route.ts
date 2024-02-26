import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(request: Request) {
    try {
        const authToken = cookies().set('authToken', '', { maxAge: -1 });
        if (!authToken) {
            getErrorResponseMessage(false, 'You must be logged in', 401);
        }
        return NextResponse.json(
            {
                success: true,
                message: 'Logged out successfully',
                data: null,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(
            false,
            'Error in logging out',
            500,
            error,
        );
    }
}
