import { IBackground } from './background-interface';

export interface IPendingCharacter {
    name: string;
    trait?: IBackground;
    flaw?: IBackground;
    bond?: IBackground;
    ideal?: IBackground;
    description?: string;
};