import bcrypt from 'bcryptjs';
import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: Request, response: Response) {
    try {
        const { email, password } = await request.json();
        const salt = Number(process.env.BCRYPT_SALT) || Number(null);
        if (!email || !password || isNaN(salt)) throw new Error('Missing data');

        const user = await User.findOne({ email });
        if (!user) {
            return getErrorResponseMessage(false, 'Users not found!', 500);
        }

        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            return getErrorResponseMessage(false, 'Wrong password!', 500);
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_KEY as string,
        );

        const response = NextResponse.json(
            {
                success: true,
                message: 'User logged in successfully',
                data: { email: user.email, password: user.password },
            },
            {
                status: 200,
            },
        );
        response.cookies.set('authToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        });

        return response;
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Users not found!', 500, error);
    }
}
