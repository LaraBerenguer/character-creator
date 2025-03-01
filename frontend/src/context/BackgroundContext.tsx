import React, { createContext, useContext, useMemo, useState } from 'react';
import { IBackground } from '../types/background-interface';
import { IBackgroundType } from '../types/background-type-interface';
import { getBackgroundsByType, addBackground } from '../services/background-crud';


interface BackgroundContextProps {
    //backgrounds: IBackground[];
    getRandomBackground: (type: IBackgroundType) => Promise<IBackground>;
    getByType: (type: IBackgroundType) => Promise<IBackground[]>;
    addUserBackground: (bgData: IBackground) => void;
    getRandomAll: () => Promise<void>;
    togglePinned: (type: IBackgroundType) => void;
    setOneBackground: (optionBackground: IBackground, type: IBackgroundType) => void;
    currentBackgrounds: Record<IBackgroundType, IBackground | null>;
    pinnedBackgrounds: Record<IBackgroundType, boolean>;
};

export const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

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

    const getRandomBackground = async (type: IBackgroundType): Promise<IBackground> => {
        const filteredBackgrounds = await getBackgroundsByType(type);
        if (filteredBackgrounds === null || filteredBackgrounds.length === 0) {
            throw new Error('Array should not be null');
        } else {
            return filteredBackgrounds[Math.floor(Math.random() * filteredBackgrounds.length)];
        };
    };

    const getByType = async (type: IBackgroundType): Promise<IBackground[]> => {
        const backgroundsByType = await getBackgroundsByType(type);
        if (backgroundsByType === null) {
            throw new Error('Array should not be null');
        } else {
            return backgroundsByType;
        };
    };

    const getRandomAll = async () => {
        const types = Object.values(IBackgroundType).filter(type => !pinnedBackgrounds[type]);
        console.log("types:", types);

        const results = await Promise.all(
            types.map(type => getRandomBackground(type))
        );
        console.log("results:", results);

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
        const addedBackground = await addBackground(bgData);
        console.log('Updated backgrounds:', addedBackground);
    };

    const value = useMemo(() => ({
        getRandomBackground,
        getByType,
        addUserBackground,
        getRandomAll,
        togglePinned,
        setOneBackground,
        currentBackgrounds,
        pinnedBackgrounds
    }), [currentBackgrounds, pinnedBackgrounds]);

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