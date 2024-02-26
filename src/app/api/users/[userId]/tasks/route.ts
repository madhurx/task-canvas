import { connectDB } from '@/helper/db';
import { NextResponse } from 'next/server';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';

connectDB();

export const GET = async (
    request: Request,
    { params }: { params: { userId: string } },
) => {
    try {
        const { userId } = params;
        const tasks = await Task.find(
            {
                userId: userId,
            },
            { userId: 0, __v: 0, updatedAt: 0 },
        );
        return NextResponse.json(
            {
                success: true,
                message: 'Tasks fetched successfully',
                data: tasks,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Tasks not fetched!', 500, error);
    }
};
