
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import { syncUserToSheet } from '../utils/sheetSync.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const backfillUsers = async () => {
    await connectDB();

    try {
        const users = await User.find({});
        console.log(`Found ${users.length} users to backfill.`);

        for (const [index, user] of users.entries()) {
            console.log(`Syncing user ${index + 1}/${users.length}: ${user.email}`);
            await syncUserToSheet(user);
            // Add a small delay to avoid hitting rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('Backfill completed successfully.');
    } catch (error) {
        console.error('Backfill error:', error);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};

backfillUsers();
