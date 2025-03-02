import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'character_db',
    username: process.env.DB_USER || 'character_user',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log
});

export const connectDB = async () => {
    try {
        console.log('Connecting to the database...');
        await sequelize.authenticate();
        console.log('Connection to db has been established successfully.');
        const isDevelopment = process.env.ENVIRONMENT?.toLowerCase() === 'development';
        if (isDevelopment) {
            console.log('Syncing database...');
            await sequelize.sync();
            console.log('Database synced');            
        };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    };
};

export default sequelize;