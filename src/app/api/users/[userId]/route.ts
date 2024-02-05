import { connectDB } from '@/helper/db';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';

connectDB();

export async function GET(request: Request, { params }: { params: any }) {
    const { userId } = params;
    try {
        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: `User with id ${userId} not found`,
                },
                { status: 404 },
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: `User with id ${userId} retrieved successfully`,
                    user,
                },
                { status: 200 },
            );
        }
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

export async function DELETE(request: Request, { params }: { params: any }) {
    const { userId } = params;
    try {
        await User.deleteOne({
            _id: userId,
        });
        return NextResponse.json(
            {
                success: true,
                message: `User with id ${userId} deleted successfully`,
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

export async function PUT(request: Request, { params }: { params: any }) {
    const { userId } = params;
    const { name, email, password, userPfp } = await request.json();

    try {
        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: `User with id ${userId} not found`,
                },
                {
                    status: 404,
                },
            );
        } else {
            user.name = name;
            user.email = email;
            user.password = password;
            user.userPfp = userPfp;

            await user.save();
            return NextResponse.json(
                {
                    success: true,
                    message: `User with id ${userId} updated successfully`,
                    user,
                },
                { status: 200 },
            );
        }
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
