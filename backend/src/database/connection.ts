import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'character_db',
    username: process.env.DB_USER || 'character_user',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
};

export default sequelize;


