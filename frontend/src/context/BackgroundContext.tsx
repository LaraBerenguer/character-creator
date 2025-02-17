import React, { createContext, useContext, useMemo } from 'react';
import { IBackground } from '../types/background-interface';
import { IBackgroundType } from '../types/background-type-interface';
import { getBackgroundsByType, addBackground } from '../services/background-crud';


interface BackgroundContextProps {
    //backgrounds: IBackground[];
    getRandomBackground: (type: IBackgroundType) => Promise<IBackground>;
    getByType: (type: IBackgroundType) => Promise<IBackground[]>;
    addUserBackground: (bgData: IBackground) => void;
};

const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    //const [backgrounds, setBackgrounds] = useState<IBackground[]>([]);    

    const getRandomBackground = async (type: IBackgroundType): Promise<IBackground> => {
        const filteredBackgrounds = getBackgroundsByType(type);
        if (filteredBackgrounds === null || filteredBackgrounds.length === 0) {
            throw new Error('Array should not be null');
        } else {
            return filteredBackgrounds[Math.floor(Math.random() * filteredBackgrounds.length)];
        }
    };

    const getByType = async (type: IBackgroundType): Promise<IBackground[]> => {
        try {
            const backgroundsByType = getBackgroundsByType(type);
            if (backgroundsByType === null) {
                throw new Error('Array should not be null');
            } else {
                return backgroundsByType;
            }
        } catch (error) {
            console.error("Error fetching data", error);
            return [];
        }
    };

    const addUserBackground = async (bgData: IBackground) => {
        //call POST in the future
        try {
            addBackground(bgData);
            console.log('Updated backgrounds:', bgData);
        } catch (error) {
            console.error("Error updating bakcgrounds:", error);
            return false;
        }
    };

    const value = useMemo(() => ({
        getRandomBackground,
        getByType,
        addUserBackground,
    }), []);

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