import { IBackground } from './background-interface';

export interface ICharacter {
    id?: number,
    name?: string,
    trait: IBackground,
    flaw: IBackground,
    bond: IBackground,
    ideal: IBackground
};

/*export interface ICharacter {
    name?: string,
    trait: ITrait,
    flaw: IFlaw,
    bond: IBond,
    ideal: IIdeal
};*/