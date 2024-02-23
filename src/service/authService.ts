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
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data.message,
        };
    }
}

export async function signIn(signInData: signUpDataType) {
    try {
        const result = await httpAxios
            .post('/api/login', signInData)
            .then((response) => response.data);
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.response.data.message,
        };
    }
}

export async function isSignedIn() {
    try {
        const result = await httpAxios
            .get('/api/authDetails')
            .then((response) => response.data);
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.response.data.message,
        };
    }
}
