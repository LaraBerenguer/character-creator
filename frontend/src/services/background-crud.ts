import { IBackground } from '../types/background-interface';
import { IBackgroundType } from '../types/background-type-interface';
import backgrounds from '../api/mockup-data-backgrounds.json';

//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

//get
export const getBackgroundByType = async (type: IBackgroundType) => {
    try {
        const filteredData = backgrounds
        .filter(bg => bg.type.toLowerCase() === type.toLowerCase())
        .map(bg => ({...bg, type: type})); //string to enum
        return filteredData[Math.floor(Math.random() * filteredData.length)];
    } catch (error) {
        console.log("Error fetching data", error);
        return null;
    }
};

//post
export const postBackground = async (bgData: IBackground) => {
    //call POST in the future
    try {
        backgrounds.push(bgData);
        console.log('Updated backgrounds:', backgrounds);
    } catch (error) {
        console.error("Error updating JSON:", error);
        return false;
    }
};