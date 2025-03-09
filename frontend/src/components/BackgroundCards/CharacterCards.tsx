import WideButton from "../../components/Buttons/WideButton";
import Card from "../../components/BackgroundCards/Card";
import { useBackgroundContext } from "../../context/BackgroundContext";
import { useCharacterContext } from "../../context/CharacterContext";
import { IBackgroundType } from "../../../../common/types/background-type-interface";
import { ICharacter } from "../../../../common/types/character-interface";
import { useNavigate } from "react-router-dom";

const CharacterCards = () => {

    const { getRandomAll, currentBackgrounds } = useBackgroundContext();
    const { setPendingCharacter } = useCharacterContext();
    const navigate = useNavigate();

    const handleRandomizeAll = () => {
        getRandomAll();
    }

    const handlePartialCharacter = () => {
        const trait = currentBackgrounds[IBackgroundType.TRAIT];
        const flaw = currentBackgrounds[IBackgroundType.FLAW];
        const bond = currentBackgrounds[IBackgroundType.BOND];
        const ideal = currentBackgrounds[IBackgroundType.IDEAL];

        if (!trait || !flaw || !bond || !ideal) {
            alert("Please select all character traits before continuing");
            return;
        }

        const pendingCharacter: ICharacter = {
            trait,
            flaw,
            bond,
            ideal,
            //user_id: 0
        };

        setPendingCharacter(pendingCharacter);
        navigate('/creation/name');
    };

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
                <WideButton buttonText={"Randomize All"} onClick={handleRandomizeAll} />
                <WideButton buttonText={"Finish character"} onClick={handlePartialCharacter} />
            </div>
        </div>
    );
};

export default CharacterCards;