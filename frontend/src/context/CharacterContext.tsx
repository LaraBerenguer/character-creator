import React, { createContext, useContext, useMemo, useState } from 'react';
import { getCharacters, getCharactersByUserId, addCharacter, deleteCharacter } from '../services/character-crud';
import { ICharacter } from '../../../common/types/character-interface';
import { useNavigate } from 'react-router-dom';


interface CharacterContextProps {
    characters: ICharacter[];
    pendingCharacter: ICharacter | null;
    getUserCharacters: () => Promise<ICharacter[]>;
    getAllCharacters: () => Promise<ICharacter[]>;
    createCharacter: (characterData: ICharacter) => void;
    removeCharacter: (characterId: number) => void;
    setPendingCharacter: (character: ICharacter) => void;
    clearPendingCharacter: () => void;
};

export const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [pendingCharacter, setPendingCharacter] = useState<ICharacter | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    //pending character
    const clearPendingCharacter = () => {
        setPendingCharacter(null);
    };

    //characters
    const getAllCharacters = async () => {
        try {
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
        } catch (error) {
            console.error('Error fetching characters', error);
            navigate("/500");
            throw error;
        };
    };

    const getUserCharacters = async () => {
        try {
            setLoading(true);
            const userCharacters: ICharacter[] = await getCharactersByUserId();

            if (userCharacters === null || userCharacters.length === 0) {
                setCharacters([]);
                setLoading(false);
                return [];
            } else {
                setCharacters(userCharacters);
                setLoading(false);
                return userCharacters;
            };
        } catch (error) {
            console.error('Error fetching characters', error);
            navigate("/500");
            throw error;
        };
    };

    const createCharacter = async (characterData: ICharacter) => {
        try {
            setLoading(true);
            const addedCharacter = await addCharacter(characterData);
            setCharacters(prev => [...prev, addedCharacter]);
            setLoading(false);
            console.log('Updated character:', addedCharacter);
        } catch (error) {
            console.error('Error adding characters', error);
            navigate("/500");
            throw error;
        };
    };

    const removeCharacter = async (characterId: number) => {
        setLoading(true);
        try {
            const deletedCharacter = await deleteCharacter(characterId);
            setCharacters(prev => prev.filter(character => character.id !== characterId));
            setLoading(false);
            console.log('Deleted character:', deletedCharacter);
        } catch (error) {
            console.error('Failed to delete character:', error);
            navigate("/500");
            throw error;
        };
    };

    const value = useMemo(() => ({
        getUserCharacters,
        getAllCharacters,
        createCharacter,
        removeCharacter,
        setPendingCharacter,
        clearPendingCharacter,
        characters,
        loading,
        pendingCharacter
    }), [characters, loading, pendingCharacter]);

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