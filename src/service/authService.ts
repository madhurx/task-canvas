import { httpAxios } from '@/helper/httpHelper';

interface signUpDataType {
    email: string;
    password: string;
}

export async function signUp(signUpData: signUpDataType) {
    try {
        const result = await httpAxios
            .post('/api/users', signUpData)
            .then((response) => response.data);

        console.log(result);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: 'Unable to register!',
        };
    }
}
