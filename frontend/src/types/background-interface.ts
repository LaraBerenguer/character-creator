import { IBackgroundType } from "./background-type-interface"

export interface IBackground {
    id: number,
    title: string,
    description: string
    type: IBackgroundType //enum trait, bond, flaw or ideal
}