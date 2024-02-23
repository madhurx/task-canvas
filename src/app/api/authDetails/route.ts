import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { User } from '@/models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

connectDB();

export async function GET(request: Request) {
    try {
        const authToken = cookies().get('authToken')?.value;
        const tokenDetails: string | JwtPayload = jwt.verify(
            authToken as string,
            process.env.JWT_KEY as string,
        );

        if (
            !tokenDetails ||
            typeof tokenDetails !== 'object' ||
            !('_id' in tokenDetails)
        ) {
            return getErrorResponseMessage(false, 'Invalid token', 401);
        }

        const user = await User.findById(tokenDetails._id).select('-password');
        return NextResponse.json(
            {
                success: true,
                message: 'User retrieved successfully',
                data: user,
            },
            { status: 200 },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Invalid token', 401, error);
    }
}
