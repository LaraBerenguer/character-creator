import { Request, Response } from "express";
import User from '../models/user';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
    id: number;
    // Add any other fields you include in your token
}

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        // Validate that no user exists with that email
        const existingUser = await User.findOne({
            where: { email: body.email }
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email already in use"
            });
        }

        // Validate password length
        if (body.password.length < 6) {
            return res.status(400).json({
                msg: "Password must be at least 6 characters"
            });
        }

        // Hash password
        const hashedPassword = await hash(body.password, 10);

        // Create user with hashed password
        const userDB = await User.create({
            ...body,
            password: hashedPassword
        });

        res.status(201).json({
            id: userDB.id,
            username: userDB.username,
            email: userDB.email
            // Don't return the password
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email/password" });
        }

        const validPassword = await compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email/password" });
        }

        console.log("SECRET_KEY", process.env.SECRET_KEY);
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }
        let access_token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        res.status(200).json({ access_token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

export const authentication = async (req: Request, res: Response, next: Function) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Authentication required" });
        }

        // Authorization: Bearer knadkjbsaafjkbsjdfkaskjbdgfajkfdjfhsdkjfksdf
        let [type, token] = req.headers.authorization.split(" ");

        if (type !== "Bearer") {
            res.status(401).json({ error: "Invalid token format" });
            return;
        };

        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is not defined in environment variables");
            res.status(500).json({ error: "Server configuration error" });
            return;
        };

        // Black magic
        let payload = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

        if (!payload) {
            res.status(401).json({ error: "Invalid token" });
            return;
        };

        let user = await User.findByPk(payload.id);

        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        };

        req.user_id = user.id;
        next();

    } catch (error) {
        // For JWT verification errors
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: "Invalid token" });
        } else {
            console.error("Authentication error:", error);
            res.status(500).json({ error: "Authentication failed" });
        };
    };
};

// Changes express request to accept adding a user id.
declare global {
    namespace Express {
        interface Request {
            user_id?: number;
        }
    }
}