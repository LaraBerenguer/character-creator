import WideButton from "../components/Buttons/WideButton";
import Card from "../components/Card";
import { IBackgroundType } from "../types/background-type-interface";

const CharacterCards = () => {
    return (
        <div className="character-creation-elements">
            <div className="character-creation-card-container flex flex-col gap-10">
                <div className="flex justify-center"><Card type={IBackgroundType.TRAIT} /></div>
                <div className="flex justify-center"><Card type={IBackgroundType.BOND} /></div>
                <div className="flex justify-center"><Card type={IBackgroundType.FLAW} /></div>
                <div className="flex justify-center"><Card type={IBackgroundType.IDEAL} /></div>
                
            </div>
            <div className="character-creation-buttons-container flex flex-col gap-5 my-5">
                <WideButton buttonText={"Interpret"} />
                <WideButton buttonText={"Finish character"}/>
            </div>

        </div>
    );
};

export default CharacterCards;