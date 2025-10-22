import React, { createContext, useContext, useMemo, useState } from 'react';
import { IBackground } from '../../../common/types/background-interface';
import { IBackgroundType } from '../../../common/types/background-type-interface';
import { getBackgroundsByType, addBackground, getBackgroundsById } from '../services/backgroundApi';
import { getPublicBackgroundsByType } from '../services/publicApi.ts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface BackgroundContextProps {
    getRandomBackground: (type: IBackgroundType) => Promise<IBackground>;
    getByType: (type: IBackgroundType) => Promise<IBackground[]>;
    getBackgroundById: (id: number) => Promise<IBackground>;
    addUserBackground: (bgData: IBackground) => void;
    getRandomAll: () => Promise<void>;
    togglePinned: (type: IBackgroundType) => void;
    setOneBackground: (optionBackground: IBackground, type: IBackgroundType) => void;
    clearBackgrounds: () => void;
    currentBackgrounds: Record<IBackgroundType, IBackground | null>;
    pinnedBackgrounds: Record<IBackgroundType, boolean>;
    refreshBackgrounds: Number;
};

export const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {user} = useAuth();

    const [currentBackgrounds, setCurrentBackgrounds] = useState<Record<IBackgroundType, IBackground | null>>({
        [IBackgroundType.TRAIT]: null,
        [IBackgroundType.BOND]: null,
        [IBackgroundType.FLAW]: null,
        [IBackgroundType.IDEAL]: null
    });
    const [pinnedBackgrounds, setPinnedBackgrounds] = useState<Record<IBackgroundType, boolean>>({
        [IBackgroundType.TRAIT]: false,
        [IBackgroundType.BOND]: false,
        [IBackgroundType.FLAW]: false,
        [IBackgroundType.IDEAL]: false
    });

    const [refreshBackgrounds, setRefreshBackgrounds] = useState(0);
    const navigate = useNavigate();

    //local or auth
    const getBackgroundsService = (type: IBackgroundType) => {
        return user ? getBackgroundsByType(type) : getPublicBackgroundsByType(type);
    };

    const getRandomBackground = async (type: IBackgroundType): Promise<IBackground> => {
        try {
            const filteredBackgrounds = await getBackgroundsService(type);
            if (filteredBackgrounds === null || filteredBackgrounds.length === 0) {
                throw new Error('Array should not be null');
            } else {
                return filteredBackgrounds[Math.floor(Math.random() * filteredBackgrounds.length)];
            };
        } catch (error) {
            console.error('Error fetching backgrounds', error);
            navigate("/500");
            throw error;
        };
    };

    const getByType = async (type: IBackgroundType): Promise<IBackground[]> => {
        try {
            const backgroundsByType = await getBackgroundsService(type);
            if (backgroundsByType === null) {
                throw new Error('Array should not be null');
            } else {
                return backgroundsByType;
            };
        } catch (error) {
            console.error('Error fetching backgrounds', error);
            navigate("/500");
            throw error;
        };
    };

    const getBackgroundById = async (id: number): Promise<IBackground> => {
        try {
            if (!user) {
                throw new Error('Authentication required for this operation');
            }
            const backgroundsById = await getBackgroundsById(id);
            return backgroundsById;
        } catch (error) {            
            console.error('Error fetching backgrounds', error);
            navigate("/500");
            throw error;
        };
    };    

    const getRandomAll = async () => {
        const types = Object.values(IBackgroundType).filter(type => !pinnedBackgrounds[type]);

        const results = await Promise.all(
            types.map(type => getRandomBackground(type))
        );

        setCurrentBackgrounds(prev => {
            const newState = { ...prev };
            types.forEach((type, index) => { newState[type] = results[index]; });
            return newState;
        });
    };

    const togglePinned = (type: IBackgroundType) => {
        setPinnedBackgrounds(prev => {
            const newPinnedState = !prev[type];
            return { ...prev, [type]: newPinnedState };
        });
    };

    const setOneBackground = (optionBackground: IBackground, type: IBackgroundType) => {
        setCurrentBackgrounds(prev => ({ ...prev, [type]: optionBackground }));
    };

    const addUserBackground = async (bgData: IBackground) => {
        try {
            if (!user) {
                //todo toast
                throw new Error('Please login to add custom backgrounds');
            }
            const addedBackground = await addBackground(bgData);
            console.log('Updated backgrounds:', addedBackground);
            setRefreshBackgrounds(prev => prev + 1);
        } catch (error) {
            if (error instanceof Error && error.message.includes('login')) {
                //todo toast
                alert('Please login to add custom backgrounds');
                return;
            }
            console.error('Error fetching backgrounds', error);
            navigate("/500");
            throw error;
        };
    };

    const clearBackgrounds = () => {
        setCurrentBackgrounds({
            [IBackgroundType.TRAIT]: null,
            [IBackgroundType.BOND]: null,
            [IBackgroundType.FLAW]: null,
            [IBackgroundType.IDEAL]: null
        })
    };

    const value = useMemo(() => ({
        getRandomBackground,
        getByType,
        getBackgroundById,
        addUserBackground,
        getRandomAll,
        togglePinned,
        setOneBackground,
        clearBackgrounds,
        currentBackgrounds,
        pinnedBackgrounds,
        refreshBackgrounds
    }), [currentBackgrounds, pinnedBackgrounds, refreshBackgrounds]);

    return (
        <BackgroundContext.Provider value={value}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackgroundContext = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error('useBackgroundContext must be used within an BackgroundProvider');
    }
    return context;
};