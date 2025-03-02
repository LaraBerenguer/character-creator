import { Request, Response } from "express";
import Background from '../models/background';

export const getBackgroundsByType = async (req: Request, res: Response) => {
    //const type = req.params.type;
    const type = req.query.type as string;
    const backgrounds = await Background.findAll({ where: { type } });

    if (backgrounds) {
        res.json(backgrounds);
    } else {
        res.status(404).json({
            msg: `Something went wrong with type ${type}`
        })
    };
};

export const createBackground = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const backgroundDB = await Background.create(body);
        res.status(201).json(backgroundDB);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        })
    };
};