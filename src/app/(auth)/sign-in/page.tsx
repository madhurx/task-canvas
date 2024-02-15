import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SignIn from './SignIn';

export const metadata = {
    title: 'Sign In: TaskCanvas',
};

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>
                <SignIn />
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
