'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '@/Images/logo.png';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignIn = () => {
    const [signInData, setSignInData] = useState<{
        email: string;
        password: string;
    }>({ email: '', password: '' });

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
                    <form>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="firstname@email.com"
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
                                    placeholder="Must have at least 6 characters"
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
