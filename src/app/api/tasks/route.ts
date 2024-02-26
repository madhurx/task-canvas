import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
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
        return getErrorResponseMessage(false, 'Tasks not fetched!', 500, error);
    }
};

export const POST = async (request: Request) => {
    try {
        const authToken = cookies().get('authToken')?.value;
        const tokenDetails: string | JwtPayload = jwt.verify(
            authToken as string,
            process.env.JWT_KEY as string,
        );

        const { title, content } = await request.json();
        const task = new Task({
            title,
            content,
            userId: (tokenDetails as JwtPayload)._id,
        });
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
