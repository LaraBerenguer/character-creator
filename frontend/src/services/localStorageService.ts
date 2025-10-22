import { ICharacter } from '../../../common/types/character-interface';

//get all
export const getCharactersFromLocalStorage = (): ICharacter[] => {
    try {
        const localCharacters = localStorage.getItem("localStorageCharacters");
        if (!localCharacters) return [];
        const characters = JSON.parse(localCharacters);
        return Array.isArray(characters) ? characters : [];

    } catch (error) {
        console.error('Error fetching local characters', error);
        return []
    };
};

//post
export const addCharacterToLocalStorage = (characterData: ICharacter): void => {

    const localCharacter: ICharacter = {
        ...characterData,
        id: new Date().getTime()
    };

    try {
        const currentCharacters = getCharactersFromLocalStorage();
        const updatedCharacters = [...currentCharacters, localCharacter];
        localStorage.setItem("localStorageCharacters", JSON.stringify(updatedCharacters));       

    } catch (error) {
        console.error('Error creating local character', error);
    };
};

//delete
export const deleteCharacterFromLocalStorage = (id: number) => {
    try {
        const currentCharacters = getCharactersFromLocalStorage();
        const updatedCharacters = currentCharacters.filter(char => char.id !== id);

        if (updatedCharacters.length === currentCharacters.length) {
            return { success: false, message: "We can't find your character!" };
        }

        localStorage.setItem("localStorageCharacters", JSON.stringify(updatedCharacters));
        return { success: true, status: 200, message: "Successfully deleted character ${id}" };

    } catch (error) {
        console.error('Error deleting local characters:', error);
    }
};

//clear
export const clearLocalStorage = () => {
    try {
        localStorage.removeItem("localStorageCharacters");

    } catch (error) {
        console.error('Error deleting local characters:', error);
    }
};

