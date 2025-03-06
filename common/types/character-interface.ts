import { IBackground } from './background-interface';

export interface ICharacter {
    id?: number,
    name?: string,
    description?: string,
    trait: IBackground,
    flaw: IBackground,
    bond: IBackground,
    ideal: IBackground,
    user_id: number
};

/*export interface ICharacter {
    name?: string,
    trait: ITrait,
    flaw: IFlaw,
    bond: IBond,
    ideal: IIdeal
};*/