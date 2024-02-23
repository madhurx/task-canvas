'use client';

import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { isSignedIn } from '@/service/authService';

interface User {
    success: boolean;
    message: string;
    data: any;
}
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const handleAuthDetails = async () => {
        try {
            const authDetails = await isSignedIn();
            console.log(authDetails);
            if (authDetails.success) {
                setUser(authDetails);
            } else {
                setUser(null);
            }
        } catch (error: any) {
            setUser(null);
        }
    };

    useEffect(() => {
        handleAuthDetails();
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
