import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CreateTask from '@/components/CreateTask';

export const metadata = {
    title: 'Create Task: TaskCanvas',
};

const page = () => {
    return (
        <MaxWidthWrapper>
            <div className="grid grid-rows-12 grid-flow-col justify-center items-center px-4 py-4 relative">
                <div className="flex flex-col col-span-12 row-span-12 dark:text-white text-black w-full sm:w-[32rem] rounded-sm h items-center relative border max-h-[calc(100vh-6rem)]">
                    <CreateTask />
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
// https://dribbble.com/shots/20685447-Create-Event-Form
