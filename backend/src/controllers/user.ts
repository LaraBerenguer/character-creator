import { Request, Response } from 'express';
import User from '../models/user';

interface AuthRequest extends Request {
    user_id?: number;
}

export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user_id) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = await User.findByPk(req.user_id, {
            attributes: ['id', 'username', 'email'] // No devolvemos la contraseña
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};