import { Sparkles, Handshake, Angry, Drama } from 'lucide-react';
import { IBackgroundType } from '../../../../common/types/background-type-interface';

const Icon = ({ type }: { type: IBackgroundType }) => {
    const explanation = () => {
        switch (type) {
            case "trait":
                return "Una cualidad distintiva de tu carácter";
            case "bond":
                return "Un lazo significativo que influye en tu vida";
            case "flaw":
                return "Una debilidad o aspecto negativo de tu personalidad";
            case "ideal":
                return "Una creencia o principio que guía tus acciones";
            default:
                return;
        };
    }

    switch (type) {
        case "trait":
            return <span title={explanation()}><Drama strokeWidth={1} size={24} /></span>;
        case "bond":
            return <span title={explanation()}><Handshake strokeWidth={1} size={20} /></span>;
        case "flaw":
            return <span title={explanation()}><Angry strokeWidth={1} size={19} /></span>;
        case "ideal":
            return <span title={explanation()}><Sparkles strokeWidth={1} size={19} /></span>;
        default:
            return;
    };
};

export default Icon;