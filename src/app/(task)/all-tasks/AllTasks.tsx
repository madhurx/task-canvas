'use client';

import AuthContext from '@/Context/AuthContext';
import { getUserTasks } from '@/service/taskService';
import { useContext, useEffect, useState } from 'react';

interface TaskType {
    content: string;
    createdAt: Date;
    status: string;
    title: string;
    // reminderDate: Date;
    _id: string;
}

const AllTasks = () => {
    // const [task, setTask] = useState<TaskType[]>([]);
    const [task, setTask] = useState<any>('B');
    const context = useContext(AuthContext);

    const loadTasks = async (userId: string) => {
        try {
            const tasks = await getUserTasks(userId);
            // setTask((prevTasks ) => [...prevTasks , ...tasks.data]);
            console.log(tasks.data);
            console.log(task);
        } catch (error) {}
    };
    useEffect(() => {
        if (context.user) {
            loadTasks(context.user?.data?._id);
        }
        console.log(task);
        setTask('A');
    }, [context.user]);

    return <div>AllTask</div>;
};

export default AllTasks;
