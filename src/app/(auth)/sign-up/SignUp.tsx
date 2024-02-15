'use client';
import Logo from '@/Images/logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/service/authService';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [signUpData, setSignUpData] = useState<{
        email: string;
        password: string;
    }>({ email: '', password: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (signUpData.email === '' || signUpData.password === '') {
                toast.warn('Please fill in all fields!');
                return;
            }
            const result = await signUp(signUpData);
            if (result.success === false) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            handleClear();
        } catch (error: any) {}
    };

    const handleClear = () => {
        setSignUpData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="container relative flex flex-col pt-12 items-center justify-center">
            <div className="mx-auto flex flex-col w-full justify-center space-y-2 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-1 text-center">
                    <div className="py-1">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="w-20"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Sign up to get started
                    </h1>
                </div>
                <div className="grid gap-4">
                    <form className="" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="firstname@email.com"
                                    name="email"
                                    value={signUpData.email}
                                    onChange={(e) =>
                                        setSignUpData({
                                            ...signUpData,
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
                                    placeholder="Must have at least 6 characters"
                                    name="password"
                                    value={signUpData.password}
                                    onChange={(e) =>
                                        setSignUpData({
                                            ...signUpData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-1 py-1">
                                <Button type="submit">Create Account</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
// F7386B
