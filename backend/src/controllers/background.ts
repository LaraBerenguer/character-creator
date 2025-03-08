import { Request, Response } from "express";
import Background from '../models/background';
import { Op } from "sequelize";

export const getBackgroundsByType = async (req: Request, res: Response) => {
    const type = req.query.type as string;
    const userId = req.user_id; //from token

    const backgrounds = await Background.findAll({
        where: {
            [Op.and]: [{ type: type }, { [Op.or]: [{ user_id: null }, { user_id: userId }] }],
        }
    });

    if (backgrounds) {
        res.json(backgrounds);
    } else {
        res.status(404).json({
            msg: `Something went wrong with type ${type}`
        })
    };
};

export const createBackground = async (req: Request, res: Response) => {
    let { body } = req;
    const userId = req.user_id; //from token   
    
    body.user_id = userId;

    try {
        const backgroundDB = await Background.create(body);
        res.status(201).json(backgroundDB);
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong"
        })
    };
};