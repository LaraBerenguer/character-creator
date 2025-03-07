import { Request, Response } from "express";
//import Character from '../models/character';

export const getCharacters = async (req: Request, res: Response) => {
    res.status(200).send("Yes! getCharacters");

    /*const characters = await Character.findAll();
    if (characters) {
        res.json(characters);
    } else {
        res.status(404).json({
            msg: "No characters found"
        })
    };*/
};

export const getCharactersById = async (req: Request, res: Response) => {
    res.status(200).send("Yes! getCharactersById");

    /*const userid = req.params.user_id as string;

    const characters = await Character.findAll({ where: { userid } });

    if (characters) {
        res.json(characters);
    } else {
        res.status(404).json({
            msg: "No characters found"
        })
    };*/
};

export const createCharacter = async (req: Request, res: Response) => {
    res.status(200).send("Yes! createCharacter");

    /*const { body } = req;

    try {
        const characterdb = await Character.create(body);
        res.status(201).json(characterdb);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong while creating character"
        })
    }*/
};

export const deleteCharacter = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Yes! deleteCharacer request for id ${id}`);

    res.status(200).json({
        message: `Character ${id} deletion requested successfully`,
        success: true,
        deletedId: id
    });

    /*
    const deletedcharacter = await Character.findByPk(id);

    if (!deletedcharacter) {
        res.status(404).json({ msg: `No character with id ${id}` });
    } else {
        await deletedcharacter.destroy();
        res.status(204).send();
    };*/
};



