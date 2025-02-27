import { connectDB } from './database/connection'
import dotenv from 'dotenv';

//env variables config
dotenv.config();
console.log("a");
const startConnection = async () => {
    console.log("testing db connection...");
    await connectDB();
};

startConnection().catch(console.error);
console.log("b");


/*console.log("Starting the server...");
const server = new Server();
console.log("Server instance created.");
server.init();
console.log("Server initialized.");*/
