import mongoose from 'mongoose';

const config = { isConnected: 0 };

export const connectDB = async () => {
    if (config.isConnected) {
        return;
    }
    try {
        const mongodbUrl = process.env.MONGODB_URL || '';
        const { connection } = await mongoose.connect(mongodbUrl, {
            dbName: 'task-canvas',
        });
        config.isConnected == connection.readyState;
        console.log('db connected successfully with host', connection.host);
    } catch (error) {
        console.log('failed to connect db');
        console.log(error);
    }
};
