import { Request, Response } from "express";
import  Background from '../models/background';
import { Op } from "sequelize";

export const getPublicBackgroundsByType = async (req: Request, res: Response) => {
    const type = req.query.type as string;

    const backgrounds = await Background.findAll({
        where: {
            type: type,            
            user_id: { [Op.is]: null as any }, 
        }
    });

    if (backgrounds) {
        res.json(backgrounds);
    } else {
        res.status(404).json({
            msg: `Something went wrong with public type ${type}`
        })
    };
};