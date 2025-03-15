import { ICharacter } from "../../../common/types/character-interface";

const BACK_URL = import.meta.env.VITE_API_URL_BACK || "http://localhost:3001";

export const generateCharacterDescription = async (character: ICharacter) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACK_URL}/api/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify({
                trait: character.trait.title,
                flaw: character.flaw.title,
                bond: character.bond.title,
                ideal: character.ideal.title,
                name: character.name || "Unnamed Character"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        const data = await response.json();
        return data.description;

    } catch (error) {
        console.error('Error creating character description', error);
        throw error;
    };
};