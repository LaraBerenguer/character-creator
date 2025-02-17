import { IBackground } from '../types/background-interface';
import { IBackgroundType } from '../types/background-type-interface';
import backgroundsData from '../api/mockup-data-backgrounds.json';

//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

let myArray: IBackground[] = [];

//get
export const getBackgroundsByType = (type: IBackgroundType) => {

    if (myArray.length == 0) {
        myArray = backgroundsData.map(bg => ({ ...bg, type: bg.type as IBackgroundType })); //string to enum
    }

    try {
        return myArray.filter(bg => bg.type.toLowerCase() === type.toLowerCase());        
    } catch (error) {
        console.error("Error fetching data", error);
        return null;
    }
};

//post
export const addBackground = async (bgData: IBackground) => {
    //call POST in the future
    try {
        myArray.push(bgData);
        console.log('Updated backgrounds:', bgData);
        return true;
    } catch (error) {
        console.error("Error updating JSON:", error);
        return false;
    }
};