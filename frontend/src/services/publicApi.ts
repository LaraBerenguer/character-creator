import { IBackgroundType } from '../../../common/types/background-type-interface';

const BACK_URL = import.meta.env.VITE_API_URL_BACK || "http://localhost:3001";

//get backgrounds
export const getPublicBackgroundsByType = async (type: IBackgroundType) => {
    try {
        const response = await fetch(`${BACK_URL}/api/public/backgrounds?type=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'                
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching public backgrounds', error);
        throw error;
    }
};