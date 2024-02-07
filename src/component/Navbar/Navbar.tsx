'use client';

import MaxWidthWrapper from '../MaxWidthWrapper';
import { useState } from 'react';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        setIsDarkMode((previousValue) => !previousValue);
    };

    return (
        <div className="sticky z-50 top-0 inset-x-0 h-16">
            <div className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="h-16 flex items-center">
                            <div className="ml-0">NavBar Logo</div>
                            <div className="hidden lg:block lg:ml-8 lg: z-50">
                                NavItem
                            </div>
                            <div className="ml-auto items-center flex ">
                                User
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default Navbar;
