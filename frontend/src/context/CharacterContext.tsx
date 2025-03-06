import React, { createContext, useContext, useMemo, useState } from 'react';
import { getCharacters, getCharactersByUserId, addCharacter, deleteCharacter } from '../services/character-crud';
import { ICharacter } from '../../../common/types/character-interface';


interface CharacterContextProps {
    characters: ICharacter[];
    getUserCharacters: (userid: number) => Promise<ICharacter[]>;
    getAllCharacters: () => Promise<ICharacter[]>;
    createCharacter: (characterData: ICharacter) => void;
    removeCharacter: (characterId: number) => void;
};

export const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAllCharacters = async () => {
        setLoading(true);
        const allCharacters = await getCharacters();
        if (allCharacters === null || allCharacters.length === 0) {
            setCharacters([]);
            setLoading(false);
            return [];
        } else {
            setCharacters(allCharacters);
            setLoading(false)
            return allCharacters;
        };
    };

    const getUserCharacters = async (userid: number) => {
        setLoading(true);
        const userCharacters: ICharacter[] = await getCharactersByUserId(userid);
        //const userCharacters = characters.filter(character => character.user_id === userid);

        if (userCharacters === null || userCharacters.length === 0) {
            setCharacters([]);
            setLoading(false);
            return [];
        } else {
            setCharacters(userCharacters);
            setLoading(false);
            return userCharacters;
        };
    };

    const createCharacter = async (characterData: ICharacter) => {
        setLoading(true);
        const addedCharacter = await addCharacter(characterData);
        setCharacters(prev => [...prev, addedCharacter]);
        setLoading(false);
        console.log('Updated character:', addedCharacter);
    };

    const removeCharacter = async (characterId: number) => {
        setLoading(true);
        const deletedCharacter = await deleteCharacter(characterId);
        setCharacters(prev => prev.filter(character => character.id !== characterId));
        setLoading(false);
        console.log('Deleted character:', deletedCharacter);
    };

    const value = useMemo(() => ({
        getUserCharacters,
        getAllCharacters,
        createCharacter,
        removeCharacter,
        characters,
        loading
    }), [characters, loading]);

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
};

export const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacterContext must be used within an CharacterProvider');
    }
    return context;
};