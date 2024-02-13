'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, EraserIcon, PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TimePickerDemo } from './ui/time-picker-demo';
import { addTask } from '@/service/taskService';
import { toast } from 'react-toastify';

const CreateTask = () => {
    // const [date, setDate] = useState();
    const [task, setTask] = useState<{
        title: string;
        content: string;
        status: string;
        reminderDate: string;
        userId: string;
    }>({
        title: '',
        content: '',
        status: '',
        reminderDate: new Date(
            new Date().setDate(new Date().getDate() + 7),
        ).toLocaleString(),
        userId: '65c082e3701038cd558f0406',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await addTask(task);
            if (result.success === false) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            handleClear();
        } catch (error: any) {
            toast.error('Something went wrong!');
        }
    };

    const handleClear = () => {
        setTask({
            title: '',
            content: '',
            status: '',
            reminderDate: new Date(
                new Date().setDate(new Date().getDate() + 7),
            ).toLocaleString(),
            userId: '65c082e3701038cd558f0406',
        });
    };

    return (
        <div className="flex flex-col w-full p-4 gap-4 dark:bg-neutral-950 bg-neutral-50 rounded-sm">
            <div className="mb-2">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Create Task
                </h3>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-1.5 mb-6">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Add task title"
                        name="title"
                        onChange={(e) => {
                            setTask({ ...task, title: e.target.value });
                        }}
                        value={task.title}
                    />
                </div>

                <div className="grid w-full gap-1.5 mb-6">
                    <Label htmlFor="content">Task Description</Label>
                    <Textarea
                        placeholder="Add task description"
                        id="content"
                        rows={5}
                        name="content"
                        onChange={(e) => {
                            setTask({ ...task, content: e.target.value });
                        }}
                        value={task.content}
                    />
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <Label htmlFor="status">Task status</Label>
                    <Select
                        name="status"
                        onValueChange={(value) =>
                            setTask({ ...task, status: value })
                        }
                        value={task.status}
                    >
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <Label htmlFor="reminderDate">Remind me via email on</Label>
                    <Popover>
                        <PopoverTrigger asChild id="reminderDate">
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-[280px] justify-start text-left font-normal',
                                    !task.reminderDate &&
                                        'text-muted-foreground',
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {task.reminderDate ? (
                                    format(task.reminderDate, 'PPP HH:mm:ss')
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={new Date(task.reminderDate)}
                                onSelect={(date: any) =>
                                    setTask({ ...task, reminderDate: date })
                                }
                                initialFocus
                                disabled={(date: any) =>
                                    date < new Date() ||
                                    date > new Date('2025-01-01')
                                }
                            />
                            <div className="p-3 border-t border-border">
                                <TimePickerDemo
                                    setDate={(date: Date | undefined) => {
                                        if (date) {
                                            setTask({
                                                ...task,
                                                reminderDate:
                                                    date.toLocaleString(),
                                            });
                                        }
                                    }}
                                    date={new Date(task.reminderDate)}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={handleClear}>
                        <EraserIcon strokeWidth={3} className="mr-2 h-4 w-4" />
                        Clear
                    </Button>

                    <Button type="submit">
                        <PlusCircleIcon
                            strokeWidth={3}
                            className="mr-2 h-4 w-4"
                        />
                        Create Task
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
