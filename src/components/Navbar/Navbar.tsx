import Link from 'next/link';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { ModeToggle } from '../ToggleMode';
import { NavMenu } from './NavMenu';

const NavBar = () => {
    return (
        <div className="sticky z-50 top-0 inset-x-0 h-16">
            <div className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-300 dark:border-gray-700 hover:cursor-default">
                        <div className="h-16 flex items-center">
                            <div className="ml-0">NavBar Logo</div>
                            <div className="ml-0">
                                <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                                    <Link href={'/'}>DashBoard</Link>
                                </p>
                            </div>
                            <div className="lg:block lg:ml-8 lg: z-50">
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
