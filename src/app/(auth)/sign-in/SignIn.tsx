'use client';

import Image from 'next/image';
import React, { useContext, useState } from 'react';
import Logo from '@/Images/logo.png';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { signIn } from '@/service/authService';
import { useRouter } from 'next/navigation';
import AuthContext from '@/Context/AuthContext';

const SignIn = () => {
    const [signInData, setSignInData] = useState<{
        email: string;
        password: string;
    }>({ email: '', password: '' });

    const router = useRouter();

    const authContext = useContext(AuthContext);
    // const { user, setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (signInData.email === '' || signInData.password === '') {
                toast.warn('Please fill in all fields!');
                return;
            }
            const result = await signIn(signInData);
            if (result.success === false) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            authContext.setUser(result);
            router.push('/');
        } catch (error: any) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className="container flex flex-col relative items-center justify-center pt-12">
            <div className="mx-auto flex flex-col justify-center sm:w-[350px] space-y-2">
                <div className="flex flex-col items-center text-center space-y-1">
                    <div className="py-1">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="w-20"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Sign in to your account
                    </h1>
                </div>
                <div className="grid gap-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Email or Mobile number"
                                    name="email"
                                    value={signInData.email}
                                    onChange={(e) =>
                                        setSignInData({
                                            ...signInData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-1 py-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Your password"
                                    name="password"
                                    value={signInData.password}
                                    onChange={(e) =>
                                        setSignInData({
                                            ...signInData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-1 py-1">
                                <Button type="submit">Sign In</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
