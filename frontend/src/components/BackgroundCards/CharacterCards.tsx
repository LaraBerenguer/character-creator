import WideButton from "../../components/Buttons/WideButton";
import Card from "../../components/BackgroundCards/Card";
import { useBackgroundContext } from "../../context/BackgroundContext";
import { IBackgroundType } from "../../../../common/types/background-type-interface";

const CharacterCards = () => {

    const { getRandomAll } = useBackgroundContext();

    const handleRandomizeAll = () => {
        getRandomAll();
    }

    return (
        <div className="character-creation-elements my-4">
            <div className="character-creation-card-container flex flex-col gap-10">
                <div className="flex justify-center"><Card type={IBackgroundType.TRAIT} /></div>
                <div className="flex justify-center"><Card type={IBackgroundType.BOND} /></div>
                <div className="flex justify-center"><Card type={IBackgroundType.FLAW} /></div>
                <div className="flex justify-center"><Card type={IBackgroundType.IDEAL} /></div>
            </div>
            <div className="character-creation-buttons-container flex flex-col gap-5">
                <WideButton buttonText={"Interpret"} />
                <WideButton buttonText={"Randomize All"} onClick={handleRandomizeAll}/>
                <WideButton buttonText={"Finish character"} />
            </div>
        </div>
    );
};

export default CharacterCards;