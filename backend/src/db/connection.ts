import mongoose from 'mongoose';
import { runMigrations } from 'migration-mongoose';
let isConnected: boolean;

export const connectToDatabase = async (): Promise<void> => {
    try {
        if (isConnected) {
            console.log('=> using existing database connection');
            return Promise.resolve();
        }

        // mongo atlas connections details
        const username = process.env.MONGODB_ATLAS_USERNAME;
        const password = process.env.MONGODB_ATLAS_PASSWORD;
        const _db = process.env.MONGODB_ATLAS_DB;
        const uri = `mongodb+srv://${username}:${password}@cluster0.mezz3.mongodb.net/${_db}?retryWrites=true`;

        console.log('=> using new database connection');
        const db = await mongoose.connect(uri || '', {
            useNewUrlParser: true,
        });
        isConnected = Boolean(db.connections[0].readyState);
        console.log('Connected...');

        // run migration 
        await runMigrations({
            uri,
            migrations: ['src/db/migration/*.migration.ts'],
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        return Promise.resolve();
    } catch (error) {
        return error.message;
    }
};
