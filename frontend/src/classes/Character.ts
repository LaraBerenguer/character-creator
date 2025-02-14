import { IBackground } from '../types/background-interface';
import { ICharacter } from '../types/character-interface';

class Character {
    id?: number;
    name?: string;
    trait: IBackground;
    flaw: IBackground;
    bond: IBackground;
    ideal: IBackground;

    constructor({ id, name, trait, bond, flaw, ideal }: ICharacter ) {
        this.id = id;
        this.name = name;
        this.trait = trait;
        this.bond = bond;
        this.flaw = flaw;
        this.ideal = ideal;
    }
}

export default Character;