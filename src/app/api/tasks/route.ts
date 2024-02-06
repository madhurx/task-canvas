import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';
import { NextResponse } from 'next/server';

connectDB();

export const GET = async () => {
    try {
        const tasks = await Task.find();

        return NextResponse.json({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks,
        });
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Task not fetched!', 500, error);
    }
};

export const POST = async (request: Request) => {
    try {
        const { title, content, userId } = await request.json();
        const task = new Task({ title, content, userId });
        const savedTask = await task.save();
        return NextResponse.json(
            {
                success: true,
                message: 'Task created successfully',
                data: savedTask,
            },
            { status: 201 },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Task not saved!', 500, error);
    }
};
