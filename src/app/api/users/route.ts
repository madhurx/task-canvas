import { connectDB } from '@/helper/db';
import { TypeUser, User } from '@/models/user';
import { NextResponse } from 'next/server';

connectDB();

export async function GET() {
    try {
        let users = [];
        users = await User.find().select('-password').select('-__v');
        return NextResponse.json(
            {
                users,
                success: true,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message || 'An unexpected error occurred',
            },
            {
                status: 500,
            },
        );
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, password, userPfp } = await request.json();
        const user = new User({ name, email, password, userPfp });
        await user.save();
        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message || 'An unexpected error occurred',
            },
            { status: 500 },
        );
    }
}
