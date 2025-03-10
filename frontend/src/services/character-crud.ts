import { ICharacter } from '../../../common/types/character-interface';

const BACK_URL = import.meta.env.VITE_API_URL_BACK || "http://localhost:3001";

//get all
export const getCharacters = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/characters`, {
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
        console.error('Error fetching characters', error);
        throw error;
    };
};

//get by id
export const getCharactersByUserId = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/characters/user`, {
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
        console.error('Error fetching characters', error);
        throw error;
    };
};

//post
export const addCharacter = async (characterData: ICharacter) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(characterData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        return response.json();

    } catch (error) {
        console.error('Error creating character', error);
        throw error;
    };
};

//delete
export const deleteCharacter = async (id: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting character:');
        };

        if (response.status === 204) {
            console.log(`Successfully deleted character ${id} (no content response)`);
            return null;
        };

        return await response.json();

    } catch (error) {
        console.error('Error deleting characters:', error);
        throw error;
    }
};