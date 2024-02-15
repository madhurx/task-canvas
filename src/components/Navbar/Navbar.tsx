import Link from 'next/link';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { ModeToggle } from '../ToggleMode';
import { NavMenu } from './NavMenu';
import Image from 'next/image';
import Logo from '@/Images/logo.png';

const NavBar = () => {
    return (
        <div className="sticky z-50 top-0 inset-x-0 h-16">
            <div className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-300 dark:border-gray-700 hover:cursor-default">
                        <div className="h-16 flex items-center">
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
                            <div className="ml-auto items-center flex ">
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
