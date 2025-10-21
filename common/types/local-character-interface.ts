import { IBackground } from './background-interface';

export interface ILocalCharacter {
    id: number;
    name: string;
    trait: IBackground;
    flaw: IBackground;
    bond: IBackground;
    ideal: IBackground;
    description?: string;
};