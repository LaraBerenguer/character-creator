import { connectDB } from './database/connection'
import dotenv from 'dotenv';
import Server from './server';

dotenv.config();

console.log("Starting the server...");
const server = new Server();
console.log("Server initialized.");