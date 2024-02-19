import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connectDB();

export async function GET() {
    try {
        let users = [];
        users = await User.find().select('-password').select('-__v');
        return NextResponse.json(
            {
                success: true,
                message: 'Users retrieved successfully',
                data: users,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Users not fetched!', 500, error);
    }
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const salt = Number(process.env.BCRYPT_SALT) || null;
        if (!salt) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Salt not found!',
                },
                { status: 500 },
            );
        }

        const hashedPass = bcrypt.hashSync(password, salt);
        const user = new User({ email, password: hashedPass });
        const savedUser = await user.save();
        return NextResponse.json(
            {
                success: true,
                message: 'User created successfully!',
                data: savedUser,
            },
            { status: 201 },
        );
    } catch (error: any) {
        return getErrorResponseMessage(
            false,
            'Failed to create user!',
            500,
            error,
        );
    }
}
