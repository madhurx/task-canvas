import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { User } from '@/models/user';
import { NextResponse } from 'next/server';

connectDB();

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: {
            userId: string;
        };
    },
) {
    const { userId } = params;
    try {
        const user = await User.findById(userId);
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
                    data: user,
                },
                { status: 200 },
            );
        }
    } catch (error: any) {
        return getErrorResponseMessage(false, 'User not fetched!', 500, error);
    }
}

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: {
            userId: string;
        };
    },
) {
    const { userId } = params;
    try {
        await User.deleteOne({
            _id: userId,
        });
        return NextResponse.json(
            {
                success: true,
                message: `User deleted successfully`,
                data: null,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'User not deleted!', 500, error);
    }
}

export async function PUT(
    request: Request,
    {
        params,
    }: {
        params: {
            userId: string;
        };
    },
) {
    const { userId } = params;
    const { name, email, password, userPfp } = await request.json();

    try {
        const user = await User.findById(userId);
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
                    message: `User updated successfully`,
                    data: user,
                },
                { status: 200 },
            );
        }
    } catch (error: any) {
        return getErrorResponseMessage(false, 'User not updated!', 500, error);
    }
}
