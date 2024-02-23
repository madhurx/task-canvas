'use client';
import { createContext } from 'react';
interface User {
    success: boolean;
    message: string;
    data: any;
}

const AuthContext = createContext<User | null>(null);
export default AuthContext;
