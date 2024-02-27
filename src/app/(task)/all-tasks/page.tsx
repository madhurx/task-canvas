import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AllTasks from './AllTasks';

export const metadata = {
    title: 'All Tasks: TaskCanvas',
};
const page = () => {
    return (
        <MaxWidthWrapper>
            <AllTasks />
        </MaxWidthWrapper>
    );
};

export default page;
// https://dribbble.com/shots/21096561-Header
