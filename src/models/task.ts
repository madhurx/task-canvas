import { Schema } from 'mongoose';

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: [1, 'Title must have at least 1 characters'],
        },
        content: {
            type: String,
            required: true,
            minLength: [1, 'Content must have at least 1 characters'],
        },
        
    },
    {
        timestamps: true,
    },
);
