import { httpAxios } from '@/helper/httpHelper';

interface TaskType {
    title: string;
    content: string;
    status: string;
    reminderDate: Date;
    userId: string;
}

export async function addTask(task: TaskType) {
    try {
        const result = await httpAxios
            .post('/api/tasks', task)
            .then((response) => response.data);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data.message,
        };
    }
}

export async function getUserTasks(userId: string) {
    try {
        const result = await httpAxios
            .get(`/api/users/${userId}/tasks`)
            .then((response) => response.data);
        return result;
    } catch (error: any) {
        return { success: false, message: error.response.data.message };
    }
}

export async function deleteUserTask(taskId: string) {
    try {
        const result = await httpAxios
            .delete(`/api/tasks/${taskId}`)
            .then((response) => response.data);
        return result;
    } catch (error: any) {
        return { success: false, message: error.response.data.message };
    }
}

export async function exportSpreadSheet() {
    try {
        const result = await httpAxios
            .get('/api/tasks/export/spreadsheet')
            .then((response) => response.data);
        return result;
    } catch (error: any) {
        return { success: false, message: error.response.data.message };
    }
}
