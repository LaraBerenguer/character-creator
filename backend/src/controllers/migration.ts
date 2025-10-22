import { Request, Response } from "express";
import Character from '../models/character';
import Background from "../models/background";
import { ICharacter } from "../../../common/types/character-interface";

export const migrateLocalStorageCharacters = async (req: Request, res: Response) => {
    const { characters } = req.body;
    const userId = req.user_id;

    if (!characters || !Array.isArray(characters)) {
        return res.status(400).json({
            msg: "Characters array is required"
        });
    }

    if (!userId) {
        return res.status(401).json({
            msg: "User ID is required"
        });
    }

    try {
        const migratedCharacters: ICharacter[] = [];
        const errors: any[] = [];

        for (const character of characters) {
            try {
                //validate all properties
                if (!character.trait?.id || !character.flaw?.id ||
                    !character.bond?.id || !character.ideal?.id) {
                    errors.push({
                        character: character.name || 'Unnamed',
                        error: 'Missing required background IDs'
                    });
                    continue;
                }

                const characterData = {
                    name: character.name || 'Unnamed Character',
                    description: character.description || null,
                    user_id: userId,
                    trait_id: character.trait.id,
                    flaw_id: character.flaw.id,
                    bond_id: character.bond.id,
                    ideal_id: character.ideal.id
                };

                const characterDB = await Character.create(characterData);

                //reload instead of findbypk
                await characterDB.reload({
                    include: [
                        { model: Background, as: 'trait' },
                        { model: Background, as: 'flaw' },
                        { model: Background, as: 'bond' },
                        { model: Background, as: 'ideal' },
                    ],
                });

                migratedCharacters.push(characterDB as unknown as ICharacter);

            } catch (characterError) {
                console.error('Error migrating character:', characterError);
                errors.push({
                    character: character.name || 'Unnamed',
                    error: 'Failed to create character in database'
                });
            }
        }

        res.status(201).json({
            msg: `Successfully migrated ${migratedCharacters.length} characters`,
            migratedCharacters,
            errors: errors.length > 0 ? errors : undefined,
            totalAttempted: characters.length,
            successCount: migratedCharacters.length,
            errorCount: errors.length
        });

    } catch (error) {
        console.error('Error in migration process:', error);
        res.status(500).json({
            msg: "Something went wrong during migration"
        });
    }
};