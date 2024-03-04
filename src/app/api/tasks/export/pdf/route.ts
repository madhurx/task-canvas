import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import path from 'path';

connectDB();

export const GET = async (req: NextApiRequest, res: Response) => {
    try {
        const authToken = cookies().get('authToken')?.value;
        const tokenDetails: string | JwtPayload = jwt.verify(
            authToken as string,
            process.env.JWT_KEY as string,
        );

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

        const htmlContent = generateHTML(taskData);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        // res.end(pdfBuffer);
        const filename = `${userEmail}-tasks.pdf`;
        const directoryPath = './public/export/pdf/';
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const filePath = path.join(directoryPath, filename);
        await fs.promises.writeFile(filePath, pdfBuffer, 'binary');

        const protocol =
            req.headers['x-forwarded-proto'] ||
            req.headers['referer']?.split(':')[0] ||
            'http';
        const host = process.env.NEXT_PUBLIC_HOST || 'localhost:3000';
        const downloadedFilePath =
            protocol + '://' + host + '/export/pdf/' + filename;

        return NextResponse.json(
            {
                success: true,
                message: 'File downloaded successfully',
                data: { filePath: downloadedFilePath },
            },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(false, 'Unable to download', 500, error);
    }
};

function generateHTML(taskData: any[]): string {
    // Implement your HTML generation logic here
    // You can use taskData to dynamically generate HTML content
    return `
        <html>
            <head>
                <title>Tasks</title>
            </head>
            <body>
                <h1>Tasks</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${taskData
                            .map(
                                (task) => `
                            <tr>
                                <td>${task.title}</td>
                                <td>${task.content}</td>
                                <td>${task.status}</td>
                                <td>${task.createdAt}</td>
                            </tr>
                        `,
                            )
                            .join('')}
                    </tbody>
                </table>
            </body>
        </html>
    `;
}
