'use client';

import Link from 'next/link';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { ModeToggle } from '../ToggleMode';
import { NavMenu } from './NavMenu';
import Image from 'next/image';
import Logo from '@/Images/logo.png';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import AuthContext from '@/Context/AuthContext';
import { signOut } from '@/service/authService';
import { toast } from 'react-toastify';
// import { getCookie, getCookies } from 'cookies-next';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useContext(AuthContext);
    useEffect(() => {
        user?.success ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, [user]);

    const handleSignOut = async () => {
        try {
            const result = await signOut();
            if (result.success) {
                setIsLoggedIn(false);
                toast.success(result.message);
            }
            if (!result.success) {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Something went wrong!');
        }
    };

    return (
        <div className="sticky z-50 top-0 inset-x-0 h-16">
            <div className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-300 dark:border-gray-700 hover:cursor-default">
                        <div className="h-16 flex items-center flex-row">
                            <div className="ml-0 mr-4 px-4">
                                <Link href={'/'}>
                                    <Image
                                        src={Logo}
                                        alt="logo"
                                        className="w-10"
                                        priority
                                    />
                                </Link>
                            </div>
                            <div className="ml-0">
                                <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                                    <Link href={'/'}>Dashboard</Link>
                                </p>
                            </div>
                            <div className="lg:block lg:ml-4 lg: z-50">
                                <NavMenu />
                            </div>
                            <div className="ml-auto flex flex-row justify-end">
                                {!isLoggedIn ? (
                                    <div className="space-x-px flex flex-row items-center">
                                        <Link href={'/sign-in'}>
                                            <Button variant={'ghost'}>
                                                Sign in
                                            </Button>
                                        </Link>
                                        <div className="h-5 w-px mx-px dark:bg-neutral-400 bg-neutral-600" />
                                        <Link href={'/sign-up'}>
                                            <Button variant={'ghost'}>
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <Button
                                            variant={'ghost'}
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="items-center flex ml-4">
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default NavBar;
