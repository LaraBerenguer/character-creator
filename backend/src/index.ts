import dotenv from 'dotenv';
dotenv.config();

import Server from './server';

async function main() {
    console.log("Starting the server...");
    const server = new Server();
    await server.init();
    console.log("Server running successfully");
};

main().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});