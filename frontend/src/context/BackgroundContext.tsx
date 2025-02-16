import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { IBackground } from '../types/background-interface';
import { IBackgroundType } from '../types/background-type-interface';
import { getBackgroundByType, postBackground } from '../services/background-crud';

interface BackgroundContextProps {
    backgrounds: IBackground[];
    fetchBackgrounds: (type: IBackgroundType) => Promise<void>;
    addBackground: (newBackground: IBackground) => void;
    deleteBackground: (id: number) => void;
    editBackground: (id: number, updatedData: Partial<IBackground>) => void;
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [backgrounds, setBackgrounds] = useState<IBackground[]>([]);

    const fetchBackgrounds = async (type: IBackgroundType) => {        
    };

    const addBackground = async (bgData: IBackground) => {
       
    };    

    useEffect(() => {
        fetchBackgrounds();
    }, []);

    const value = useMemo(() => ({
        backgrounds,
        fetchBackgrounds,
        addBackground,
    }), [backgrounds]);

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