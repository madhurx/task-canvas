import { httpAxios } from '@/helper/httpHelper';

interface TaskType {
    title: String;
    content: String;
    status: String;
    reminderDate: String;
    userId: String;
}

export async function addTask(task: TaskType) {
    try {
        const result = await httpAxios
            .post('/api/tasks', task)
            .then((response) => response.data);
        return result;
    } catch (error) {
        return {
            success: false,
            message: 'Task not saved!',
        };
    }
}
