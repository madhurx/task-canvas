import mongoose, { Document, Schema } from 'mongoose';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export interface TypeUser extends Document {
    name: string;
    email: string;
    password: string;
    userPfp: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<TypeUser>(
    {
        name: {
            type: String,
            required: true,
            minLength: [2, 'Name must have at least 2 characters'],
            maxLength: [30, 'Name can have at most 30 characters'],
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (password: string) {
                    return passwordRegex.test(password);
                },
                message: (props: { value: string }) =>
                    `${props.value} is not a valid password. Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).`,
            },
        },
        userPfp: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

export const User =
    mongoose.models.users || mongoose.model<TypeUser>('users', userSchema);
