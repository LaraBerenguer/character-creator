import { ICharacter } from '../../../common/types/character-interface';

const BACK_URL = import.meta.env.VITE_API_URL_BACK || "http://localhost:3001";

//migrate all
export const migrateCharactersToDatabase = async (characters: ICharacter[]) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${BACK_URL}/api/local-storage/migrate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ characters })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error migrating characters:', error);
        throw error;
    }
};