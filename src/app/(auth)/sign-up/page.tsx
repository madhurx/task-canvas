import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SignUp from './SignUp';

export const metadata = {
    title: 'Sign Up: TaskCanvas',
};

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>
                <SignUp />
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
