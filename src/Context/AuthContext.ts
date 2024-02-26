'use client';
import { createContext } from 'react';
interface User {
    success: boolean;
    message: string;
    data: any;
}
interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

export default AuthContext;
