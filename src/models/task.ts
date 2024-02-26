import mongoose, { Document, Schema } from 'mongoose';

const statusEnum = ['pending', 'in-progress', 'completed'];

export interface TypeTask extends Document {
    title: string;
    content: string;
    status: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<TypeTask>(
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
        status: {
            type: String,
            enum: statusEnum,
            required: true,
            default: statusEnum[0],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Task =
    mongoose.models.Task || mongoose.model<TypeTask>('Task', taskSchema);
