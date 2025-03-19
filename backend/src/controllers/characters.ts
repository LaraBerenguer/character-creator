import { Request, Response } from "express";
import Character from '../models/character';
import Background from "../models/background";
import { ICharacter } from "../../../common/types/character-interface";

export const getCharacters = async (req: Request, res: Response) => {
    const characters = await Character.findAll(); //add models later if used
    if (characters) {
        res.json(characters);
    } else {
        res.status(404).json({
            msg: "No characters found"
        })
    };
};

export const getCharactersById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const characters = await Character.findAll({ where: { id } }); //add models later if used

    if (characters) {
        res.json(characters);
    } else {
        res.status(404).json({
            msg: `  Character with id ${id} not found`
        })
    };
};

export const getCharactersByUserId = async (req: Request, res: Response) => {
    const userId = req.user_id; //from token   

    try {
        const characters = await Character.findAll({ 
            where: { user_id: userId },
            include: [
                { model: Background, as: 'trait' },
                { model: Background, as: 'flaw' },
                { model: Background, as: 'bond' },
                { model: Background, as: 'ideal' },
            ],
        }) as unknown as ICharacter[];
        
        res.json(characters);
        /*if (characters && characters.length > 0) {
            res.json(characters);
        } else {
            res.status(404).json({
                msg: `No characters found for user ${userId}`
            });
        }*/
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({
            msg: "Error retrieving characters with backgrounds"
        });
    }
};

export const createCharacter = async (req: Request, res: Response) => {
    const { body } = req;
    const userId = req.user_id;

    body.user_id = userId;

    try {
        const characterdb = await Character.create(body);
        await characterdb.reload({
            include: [
            { model: Background, as: 'trait' },
            { model: Background, as: 'flaw' },
            { model: Background, as: 'bond' },
            { model: Background, as: 'ideal' },
            ],
        });
        res.status(201).json(characterdb);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong while creating character"
        })
    }
};

export const deleteCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedcharacter = await Character.findByPk(id);

    if (!deletedcharacter) {
        res.status(404).json({ msg: `No character with id ${id}` });
    } else {
        await deletedcharacter.destroy();
        res.status(204).send();
    };
};



