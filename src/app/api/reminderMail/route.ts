import { connectDB } from '@/helper/db';
import { getErrorResponseMessage } from '@/helper/errorResponseMessage';
import { Task } from '@/models/task';
import { endOfDay, startOfDay } from 'date-fns';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

connectDB();

export async function GET() {
    try {
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        const tasks = await Task.aggregate([
            {
                $match: {
                    reminderDate: {
                        $gte: todayStart,
                        $lte: todayEnd,
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    content: 1,
                    status: 1,
                    email: '$user.email',
                },
            },
        ]);

        tasks.map(async (task) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_USERNAME,
                to: task.email,
                subject: 'Tasks Reminder',
                text: `${task.title} - ${task.content}`,
            };

            await transporter.sendMail(mailOptions);
        });
        return NextResponse.json(
            { success: true, message: 'Emails sent successfully' },
            {
                status: 200,
            },
        );
    } catch (error: any) {
        return getErrorResponseMessage(
            false,
            'Unable to send email',
            500,
            error,
        );
    }
}
