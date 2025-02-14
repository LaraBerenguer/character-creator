import { IBackground } from '../types/background-interface';
import { IBackgroundType } from '../types/background-type-interface';

class Background {
    id: number;
    title: string;
    description: string;
    type: IBackgroundType;

    constructor({ id, title, description, type }: IBackground) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
    }
};

export default Background;