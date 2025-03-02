import express, { Request, Response } from 'express';
import { connectDB } from './database/connection';
import seedDatabase from './database/seed/seed';
import cors from 'cors';
import backgroundRoutes from './routes/backgrounds';

class Server {
    private readonly app: express.Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
    };

    async init() {
        try {
            console.log('Initializing middlewares...');
            this.middlewares();
            console.log('Middlewares initialized.');

            console.log('Setting up routes...');
            this.routes();
            console.log('Routes set up.');           

            console.log('Initializing server...');
            await connectDB();
            console.log('Database connected');
            console.log('Running seedDatabase...');
            await seedDatabase();
            console.log('Database initialized and seeded');
            this.listen();
        } catch (error) {
            console.error('Error initializing server:', error);
            process.exit(1);
        }
    };

    private middlewares() {
        // Print backend petitions     
        this.app.use((req, res, next) => {
            console.log(`Request received: ${req.method} ${req.url}`);
            next();
        });

        this.app.use(cors());
        this.app.use(express.json());
    };

    routes() {
        this.app.use('/api/backgrounds', backgroundRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };
};

export default Server;