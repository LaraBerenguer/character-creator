import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { getCharacters, getCharactersByUserId, addCharacter, deleteCharacter } from '../services/characterApi';
import { generateCharacterDescription } from '../services/aiIntegrationApi';
import { migrateCharactersToDatabase } from '../services/migrationApi';
import { getCharactersFromLocalStorage, addCharacterToLocalStorage, deleteCharacterFromLocalStorage, clearLocalStorage } from '../services/localStorageService';
import { ICharacter } from '../../../common/types/character-interface';
import { IPendingCharacter } from "../../../common/types/pending-character-interface";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

//reducer
interface State {
    characters: ICharacter[],
    pendingCharacters: IPendingCharacter | null,
    loading: boolean
    loadingDescription: boolean
    migrating: boolean
};

type Action =
    | { type: 'SET_CHARACTERS'; payload: ICharacter[] }
    | { type: 'SET_PENDING_CHARACTERS'; payload: IPendingCharacter | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_LOADING_DESCRIPTION'; payload: boolean }
    | { type: 'ADD_CHARACTER'; payload: ICharacter }
    | { type: 'REMOVE_CHARACTER'; payload: number }
    | { type: 'SET_MIGRATING'; payload: boolean }

const initialState = {
    characters: [],
    pendingCharacters: null,
    loading: false,
    loadingDescription: false,
    migrating: false
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_CHARACTERS":
            return { ...state, characters: action.payload };
        case "SET_PENDING_CHARACTERS":
            return { ...state, pendingCharacters: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_LOADING_DESCRIPTION":
            return { ...state, loadingDescription: action.payload };
        case "ADD_CHARACTER":
            return { ...state, characters: [...state.characters, action.payload] };
        case "REMOVE_CHARACTER":
            return { ...state, characters: state.characters.filter(char => char.id !== action.payload) };
        case "SET_MIGRATING":
            return { ...state, migrating: action.payload };
        default:
            return state;
    };
};

interface CharacterContextProps {
    characters: ICharacter[];
    pendingCharacter: IPendingCharacter | null;
    loading: boolean;
    loadingDescription: boolean;
    migrating: boolean;
    getUserCharacters: () => Promise<ICharacter[]>;
    getAllCharacters: () => Promise<ICharacter[]>;
    createCharacter: (characterData: ICharacter) => void;
    removeCharacter: (characterId: number) => void;
    setPendingCharacter: (character: IPendingCharacter) => void;
    clearPendingCharacter: () => void;
    generateDescription: (character: ICharacter) => Promise<string>;
    migrateLocalCharacters: () => Promise<void>;
};

export const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        loadInitialCharacters();
    }, [user]);

    const loadInitialCharacters = async () => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });

            if (user) {
                //from database
                const userCharacters = await getCharactersByUserId();
                dispatch({ type: "SET_CHARACTERS", payload: userCharacters || [] });
            } else {
                //local
                const localCharacters = getCharactersFromLocalStorage();
                dispatch({ type: "SET_CHARACTERS", payload: localCharacters });
            }

            dispatch({ type: "SET_LOADING", payload: false });
        } catch (error) {
            console.error('Error loading initial characters:', error);
            dispatch({ type: "SET_LOADING", payload: false });
            dispatch({ type: "SET_CHARACTERS", payload: [] });
        }
    };

    const migrateLocalCharacters = async () => {
        try {
            if (!user) {
                throw new Error('User must be logged in to migrate characters');
            }

            dispatch({ type: "SET_MIGRATING", payload: true });

            const localCharacters = getCharactersFromLocalStorage();

            if (localCharacters.length === 0) {
                dispatch({ type: "SET_MIGRATING", payload: false });
                return;
            }

            const migrationResult = await migrateCharactersToDatabase(localCharacters);

            //clean localStorage
            if (migrationResult.successCount > 0) {
                clearLocalStorage();
                await loadInitialCharacters();
            }

            dispatch({ type: "SET_MIGRATING", payload: false });

            console.log(`Migrated ${migrationResult.successCount} characters successfully`);
            if (migrationResult.errorCount > 0) {
                console.warn(`${migrationResult.errorCount} characters failed to migrate`);
            }

        } catch (error) {
            console.error('Error migrating characters:', error);
            dispatch({ type: "SET_MIGRATING", payload: false });
            throw error;
        }
    };

    //pending character
    const clearPendingCharacter = () => {
        dispatch({ type: "SET_PENDING_CHARACTERS", payload: null })
    };

    const setPendingCharacter = (character: IPendingCharacter) => {
        dispatch({ type: "SET_PENDING_CHARACTERS", payload: character })
    };

    //description
    const generateDescription = async (character: ICharacter) => {
        try {
            if (!user) {
                throw new Error('Please login to generate character descriptions');
            }

            dispatch({ type: "SET_LOADING_DESCRIPTION", payload: true });
            const description = await generateCharacterDescription(character);

            dispatch({ type: "SET_LOADING_DESCRIPTION", payload: false });
            return description;

        } catch (error) {
            console.error('Error generating description', error);
            dispatch({ type: "SET_LOADING_DESCRIPTION", payload: false });
            if (error instanceof Error && error.message.includes('login')) {
                // No navegar a error si no está logueado
                alert('Please login to generate character descriptions');
                return '';
            }
            navigate("/500");
            throw error;
        };
    };

    //characters
    const getAllCharacters = async () => {
        try {
            if (!user) {
                throw new Error('Authentication required');
            }

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
            if (!user) {                
                const localCharacters = getCharactersFromLocalStorage();
                dispatch({ type: "SET_CHARACTERS", payload: localCharacters });
                return localCharacters;
            }

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
            dispatch({ type: "SET_LOADING", payload: false });
            dispatch({ type: "SET_CHARACTERS", payload: [] }); // Fallback
            navigate("/500");
            throw error;
        };
    };

    const createCharacter = async (characterData: ICharacter) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            
            if (user) {
                //to database
                const addedCharacter = await addCharacter(characterData);
                dispatch({ type: "ADD_CHARACTER", payload: addedCharacter });
                console.log('Character saved to database:', addedCharacter);
            } else {
                //local
                addCharacterToLocalStorage(characterData);
                const updatedLocalCharacters = getCharactersFromLocalStorage();
                const newCharacter = updatedLocalCharacters[updatedLocalCharacters.length - 1];
                dispatch({ type: "ADD_CHARACTER", payload: newCharacter });
                console.log('Character saved to localStorage:', newCharacter);
            }
            
            dispatch({ type: "SET_LOADING", payload: false });
        } catch (error) {
            console.error('Error adding characters', error);
            dispatch({ type: "SET_LOADING", payload: false });
            navigate("/500");
            throw error;
        };
    };

    const removeCharacter = async (characterId: number) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            
            if (user) {
                //database
                await deleteCharacter(characterId);
                console.log('Character deleted from database');
            } else {
                //local
                deleteCharacterFromLocalStorage(characterId);
                console.log('Character deleted from localStorage');
            }
            
            dispatch({ type: "REMOVE_CHARACTER", payload: characterId });
            dispatch({ type: "SET_LOADING", payload: false });
        } catch (error) {
            console.error('Failed to delete character:', error);
            dispatch({ type: "SET_LOADING", payload: false });
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
        generateDescription,
        migrateLocalCharacters,
        characters: state.characters,
        loading: state.loading,
        loadingDescription: state.loadingDescription,
        migrating: state.migrating,
        pendingCharacter: state.pendingCharacters
    }), [state.characters, state.loading, state.loadingDescription, state.migrating, state.pendingCharacters, user]);

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