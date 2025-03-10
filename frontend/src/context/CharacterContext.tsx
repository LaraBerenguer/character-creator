import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { getCharacters, getCharactersByUserId, addCharacter, deleteCharacter } from '../services/character-crud';
import { ICharacter } from '../../../common/types/character-interface';
import { useNavigate } from 'react-router-dom';

//reducer
interface State {
    characters: ICharacter[],
    pendingCharacters: ICharacter | null,
    loading: boolean
};

type Action =
    | { type: 'SET_CHARACTERS'; payload: ICharacter[] }
    | { type: 'SET_PENDING_CHARACTERS'; payload: ICharacter | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'ADD_CHARACTER'; payload: ICharacter }
    | { type: 'REMOVE_CHARACTER'; payload: number }

const initialState = {
    characters: [],
    pendingCharacters: null,
    loading: false
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_CHARACTERS":
            return { ...state, characters: action.payload };
        case "SET_PENDING_CHARACTERS":
            return { ...state, pendingCharacters: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "ADD_CHARACTER":
            return { ...state, characters: [...state.characters, action.payload] };
        case "REMOVE_CHARACTER":
            return { ...state, characters: state.characters.filter(char => char.id !== action.payload) };
        default:
            return state;
    };
};

interface CharacterContextProps {
    characters: ICharacter[];
    pendingCharacter: ICharacter | null;
    loading: boolean;
    getUserCharacters: () => Promise<ICharacter[]>;
    getAllCharacters: () => Promise<ICharacter[]>;
    createCharacter: (characterData: ICharacter) => void;
    removeCharacter: (characterId: number) => void;
    setPendingCharacter: (character: ICharacter) => void;
    clearPendingCharacter: () => void;
};

export const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    //pending character
    const clearPendingCharacter = () => {
        dispatch({ type: "SET_PENDING_CHARACTERS", payload: null })
    };

    const setPendingCharacter = (character: ICharacter) => {
        dispatch({ type: "SET_PENDING_CHARACTERS", payload: character })
    };

    //characters
    const getAllCharacters = async () => {
        try {
            dispatch({ type: "SET_LOADING", payload: true })
            const allCharacters = await getCharacters();

            if (allCharacters === null || allCharacters.length === 0) {
                dispatch({ type: "SET_CHARACTERS", payload: [] });
                dispatch({ type: "SET_LOADING", payload: false });
                return [];
            } else {
                dispatch({ type: "SET_CHARACTERS", payload: allCharacters });
                dispatch({ type: "SET_LOADING", payload: false });
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
            dispatch({ type: "SET_LOADING", payload: true });
            const userCharacters: ICharacter[] = await getCharactersByUserId();

            if (userCharacters === null || userCharacters.length === 0) {
                dispatch({ type: "SET_CHARACTERS", payload: [] });
                dispatch({ type: "SET_LOADING", payload: false });
                return [];
            } else {
                dispatch({ type: "SET_CHARACTERS", payload: userCharacters });
                dispatch({ type: "SET_LOADING", payload: false });
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
            dispatch({ type: "SET_LOADING", payload: true });
            const addedCharacter = await addCharacter(characterData);
            dispatch({ type: "ADD_CHARACTER", payload: addedCharacter });
            dispatch({ type: "SET_LOADING", payload: false });
            console.log('Updated character:', addedCharacter);
        } catch (error) {
            console.error('Error adding characters', error);
            navigate("/500");
            throw error;
        };
    };

    const removeCharacter = async (characterId: number) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            const deletedCharacter = await deleteCharacter(characterId);
            dispatch({ type: "REMOVE_CHARACTER", payload: characterId });
            dispatch({ type: "SET_LOADING", payload: false });
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
        clearPendingCharacter,
        setPendingCharacter,
        characters: state.characters,
        loading: state.loading,
        pendingCharacter: state.pendingCharacters
    }), [state.characters, state.loading, state.pendingCharacters]);

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