import { IBackground } from '../../../common/types/background-interface';
import { IBackgroundType } from '../../../common/types/background-type-interface';

const BACK_URL = import.meta.env.VITE_API_URL_BACK || "http://localhost:3001";

//get
export const getBackgroundsByType = async (type: IBackgroundType) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/backgrounds?type=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        const data = response.json();
        return data;

    } catch (error) {
        console.error('Error fetching backgrounds', error);
        // TO DO redirect 500
    };
};

//post
export const addBackground = async (bgData: IBackground) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/backgrounds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(bgData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        return response.json();

    } catch (error) {
        console.error('Error fetching backgrounds', error);
        // TO DO redirect 500
    };
};