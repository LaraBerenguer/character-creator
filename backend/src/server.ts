import express, { Request, Response } from 'express';
import { connectDB } from './database/connection';

class Server {
    private readonly app: express.Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        //this.middlewares();
        this.routes();    
        this.init();    
    };

    async init() {
        //this.middlewares();
        this.routes();
        await connectDB();        
        //this.seedDatabase(); para datos de base
        
    };

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: "Api working"
            })
        });        
    }
};

export default Server;