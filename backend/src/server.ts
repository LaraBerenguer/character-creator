import express, { Request, Response } from 'express';
import { connectDB } from './database/connection';
import seedDatabase from './database/seed/seed';
import cors from 'cors';
import backgroundRoutes from './routes/backgrounds';
import loginRoutes from './routes/login';
import registerRoutes from './routes/register';
import usersRoutes from './routes/users';
import characterRoutes from './routes/characters';
import aiRoutes from './routes/ai-integrations';

class Server {
    private readonly app: express.Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
    };

    async init() {
        try {

            this.middlewares();
            this.routes();
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
        this.app.use('/api/register', registerRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api', usersRoutes);
        this.app.use('/api/characters', characterRoutes);
        this.app.use('/api/ai', aiRoutes);

        this.app.use((err: any, req: Request, res: Response, next: Function) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });

    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };
};

export default Server;