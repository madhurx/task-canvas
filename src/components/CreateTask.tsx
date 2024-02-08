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
import {
    CalendarIcon,
    EraserIcon,
    PlusCircleIcon,
    XCircleIcon,
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CreateTask = () => {
    const [date, setDate] = useState();
    return (
        <div className="flex flex-col w-full p-4 gap-4 dark:bg-neutral-950 bg-neutral-50 rounded-sm">
            <div className="mb-2">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Create Task
                </h3>
            </div>
            <form action={'#'} className="w-full">
                <div className="grid w-full items-center gap-1.5 mb-6">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Add task title"
                    />
                </div>

                <div className="grid w-full gap-1.5 mb-6">
                    <Label htmlFor="content">Task Description</Label>
                    <Textarea
                        placeholder="Add task description"
                        id="content"
                        rows={5}
                    />
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <Label htmlFor="status">Task status</Label>
                    <Select>
                        <SelectTrigger className="w-[280px]" id="status">
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
                    <Label htmlFor="emailDate">Remind me via email on</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-[280px] justify-start text-left font-normal',
                                    !date && 'text-muted-foreground',
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    format(date, 'PPP')
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost">
                        <EraserIcon strokeWidth={3} className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                    <Button variant="secondary">
                        <XCircleIcon strokeWidth={3} className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                    <Button>
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
