'use client';

import AuthContext from '@/Context/AuthContext';
import { getUserTasks } from '@/service/taskService';
import { useContext, useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

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
    // const [task, setTask] = useState<any>('B');
    const context = useContext(AuthContext);

    const loadTasks = async (userId: string) => {
        try {
            const tasks = await getUserTasks(userId);
            setTask(tasks.data);
            // setTask("asd")
            console.log(tasks.data);
            console.log(task);
        } catch (error) {}
    };
    useEffect(() => {
        if (context.user) {
            loadTasks(context.user?.data?._id);
        }
        // setTask('A');
    }, [context.user]);

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
