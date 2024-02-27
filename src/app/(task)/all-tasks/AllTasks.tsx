'use client';

import AuthContext from '@/Context/AuthContext';
import { deleteUserTask, getUserTasks } from '@/service/taskService';
import { useContext, useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { toast } from 'react-toastify';

export type TypeTasksTable = {
    content: string;
    createdAt: Date;
    status: string;
    title: string;
    // reminderDate: Date;
    _id: string;
};

const AllTasks = () => {
    const [task, setTask] = useState<TypeTasksTable[]>([]);
    const context = useContext(AuthContext);

    useEffect(() => {
        const loadTasks = async (userId: string) => {
            try {
                const tasks = await getUserTasks(userId);
                setTask(tasks.data);
            } catch (error) {}
        };

        if (context.user) {
            loadTasks(context.user?.data?._id);
        }
    }, [context.user, task]);

    return (
        <div className="container mx-auto py-4">
            <div className="text-2xl font-bold py-2">
                Welcome back!
                <br />
                <span className="text-base dark:text-neutral-400 text-neutral-600 py-px">
                    Here is a list of all your tasks!
                </span>
            </div>
            <DataTable columns={columns} data={task} />
        </div>
    );
};

export default AllTasks;

export async function deleteTask(taskId: string) {
    try {
        const result = await deleteUserTask(taskId);
        if (result.success === false) {
            toast.error(result.message);
            return;
        }
        toast.success(result.message);
    } catch (error: any) {
        toast.error('Something went wrong!');
    }
}
