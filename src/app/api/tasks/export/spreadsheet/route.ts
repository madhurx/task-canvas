import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

connectDB();

export const GET = async (req: Request, res: Response) => {
    try {
        const authToken = cookies().get('authToken')?.value;
        const tokenDetails: string | JwtPayload = jwt.verify(
            authToken as string,
            process.env.JWT_KEY as string,
        );
        console.log(tokenDetails);
        const _id = (tokenDetails as JwtPayload)._id;
        const userEmail = (tokenDetails as JwtPayload).email;

        const tasks = await Task.find({ userId: _id }).select({
            _id: 0,
            __v: 0,
            updatedAt: 0,
            userId: 0,
            reminderDate: 0,
        });
        const taskData = tasks.map((task) => ({
            title: task.title,
            content: task.content,
            status: task.status,
            createdAt: task.createdAt,
        }));

        const headers = ['Title', 'Content', 'Status', 'Created At'];
        const directoryPath = './public/export/spreadSheet/';
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyyMMddHHmmss');
        const filename = `${userEmail}-${formattedDate}-tasks.xlsx`;
        const filePath = path.join(directoryPath, filename);

        const dataWithHeaders = [headers, ...taskData];
        XLSX.set_fs(fs);
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
        XLSX.writeFile(workbook, filePath);

        console.log('Excel file created successfully.');

        return NextResponse.json(
            {
                success: true,
                message: 'Tasks fetched successfully',
                data: { filePath },
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Tasks not fetched!', 500, error);
    }
};
