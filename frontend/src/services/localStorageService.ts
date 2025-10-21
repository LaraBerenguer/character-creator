import { ILocalCharacter } from '../../../common/types/local-character-interface';

//get all
export const getCharactersFromLocalStorage = async (): Promise<ILocalCharacter[]> => {
    try {
        const localCharacters = localStorage.getItem("localStorageCharacters");
        if (!localCharacters) return [];
        const characters = JSON.parse(localCharacters);
        return characters;

    } catch (error) {
        console.error('Error fetching local characters', error);
        throw error;
    };
};

//post
export const addCharacterToLocalStorage = async (characterData: ILocalCharacter): Promise<ILocalCharacter> => {

    const localCharacter = {
        ...characterData,
        id: new Date().getTime(),
        trait_id: characterData.trait.id,
        bond_id: characterData.bond.id,
        flaw_id: characterData.flaw.id,
        ideal_id: characterData.ideal.id
    };

    try {
        const currentCharacters = await getCharactersFromLocalStorage();
        const updatedCharacters = [...currentCharacters, localCharacter];
        localStorage.setItem("localStorageCharacters", JSON.stringify(updatedCharacters));
        return localCharacter;

    } catch (error) {
        console.error('Error creating local character', error);
        throw error;
    };
};

//delete
export const deleteCharacterFromLocalStorage = async (id: number) => {
    try {
        const currentCharacters = await getCharactersFromLocalStorage();
        const updatedCharacters = currentCharacters.filter(char => char.id !== id);

        if (updatedCharacters.length === currentCharacters.length) {
            return { success: false, message: "We can't find your character!" };
        }

        localStorage.setItem("localStorageCharacters", JSON.stringify(updatedCharacters));
        return { success: true, status: 200, message: "Successfully deleted character ${id}" };

    } catch (error) {
        console.error('Error deleting local characters:', error);
        throw error;
    }
};

//clear
export const clearLocalStorage = async () => {
    try {
        localStorage.setItem("localStorageCharacters", JSON.stringify([]));

    } catch (error) {
        console.error('Error deleting local characters:', error);
        throw error;
    }
};

