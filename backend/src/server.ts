import express, { Request, Response } from 'express';
import { connectDB } from './database/connection';
import cors from 'cors';
import backgroundRoutes from './routes/backgrounds';

class Server {
    private readonly app: express.Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.middlewares();
        this.routes();
        this.init();
    };

    async init() {
        this.middlewares();
        this.routes();
        await connectDB();
        //this.seedDatabase(); para datos de base
    };

    routes() {
        this.app.use('/api/backgrounds', backgroundRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };

    private middlewares() {
        //print backend petitions     
        this.app.use((req, res, next) => {
            console.log(`Request recived: ${req.method} ${req.url}`);
            next();
        });

        this.app.use(cors());
        this.app.use(express.json());
    };
};

export default Server;