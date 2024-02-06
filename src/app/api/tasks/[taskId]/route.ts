import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';
import { NextResponse } from 'next/server';

connectDB();

export const GET = async (
    request: Request,
    { params }: { params: { taskId: string } },
) => {
    try {
        const { taskId } = params;
        const task = await Task.findById(taskId);
        return NextResponse.json(
            {
                success: true,
                message: 'Task retrieved successfully!',
                data: task,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Task not found!', 500, error);
    }
};

export const DELETE = async (
    request: Request,
    { params }: { params: { taskId: string } },
) => {
    try {
        const { taskId } = params;
        await Task.findByIdAndDelete(taskId);
        return NextResponse.json(
            {
                success: true,
                message: `Task Removed`,
                data: null,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Task not removed!', 500, error);
    }
};

export const PUT = async (
    request: Request,
    { params }: { params: { taskId: string } },
) => {
    try {
        const { taskId } = params;
        const { title, content, status } = await request.json();
        const task = await Task.findById(taskId);
        task.title = title;
        task.content = content;
        task.status = status;
        const savedTask = await task.save();
        return NextResponse.json(
            {
                success: true,
                message: 'Task updated successfully!',
                data: savedTask,
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Task not Updated!', 500, error);
    }
};
