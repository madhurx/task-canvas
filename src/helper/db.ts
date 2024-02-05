import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongodbUrl = process.env.MONGODB_URL || '';
        const { connection } = await mongoose.connect(mongodbUrl, {
            dbName: 'task-canvas',
        });
        console.log('db connected successfully with host', connection.host);
    } catch (error) {
        console.log('failed to connect db');
        console.log(error);
    }
};
