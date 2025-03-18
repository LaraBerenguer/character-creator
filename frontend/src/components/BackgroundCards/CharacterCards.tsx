import WideButton from "../../components/Buttons/WideButton";
import Card from "../../components/BackgroundCards/Card";
import Loading from "../../components/Loading/Loading";
import { useBackgroundContext } from "../../context/BackgroundContext";
import { useCharacterContext } from "../../context/CharacterContext";
import { IBackgroundType } from "../../../../common/types/background-type-interface";
import { ICharacter } from "../../../../common/types/character-interface";
import { useNavigate } from "react-router-dom";
import { IBackground } from "../../../../common/types/background-interface";
import { useEffect, useRef, useState } from "react";
import DescriptionModal from "../Characters/DescriptionModal";

const CharacterCards = () => {

    const { getRandomAll, currentBackgrounds, clearBackgrounds } = useBackgroundContext();
    const { pendingCharacter, loading, setPendingCharacter, generateDescription, createCharacter } = useCharacterContext();
    const [description, setDescription] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const modalRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isModalOpen && !loading && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [isModalOpen, loading]);


    const handleRandomizeAll = () => {
        getRandomAll();
    };

    const buildFinalCharacter = () => {
        const trait = currentBackgrounds[IBackgroundType.TRAIT];
        const flaw = currentBackgrounds[IBackgroundType.FLAW];
        const bond = currentBackgrounds[IBackgroundType.BOND];
        const ideal = currentBackgrounds[IBackgroundType.IDEAL];

        if (!trait || !flaw || !bond || !ideal) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        const finalCharacter: ICharacter = {
            ...pendingCharacter,
            trait: trait as IBackground,
            flaw: flaw as IBackground,
            bond: bond as IBackground,
            ideal: ideal as IBackground,
        };

        return finalCharacter;
    };

    const handleFinishCharacter = () => {
        const character = buildFinalCharacter();
        if (character) {
            createCharacter(character);
            clearBackgrounds();
            navigate('/dashboard');
        };
    };

    const handleInterpret = async () => {
        const character = buildFinalCharacter();
        if (character) {
            const characterDescription = await generateDescription(character);
            setDescription(characterDescription);
            setIsModalOpen(true);
        };
    };

    const AcceptDescription = () => {
        if (pendingCharacter) {
            setPendingCharacter({
                ...pendingCharacter,
                name: pendingCharacter.name || "Unnamed Character",
                description: description,
            });
        };
        modalRef.current?.close();
        setIsModalOpen(false);
    };

    const CancelDescription = () => {
        modalRef.current?.close();
        setIsModalOpen(false);
    };

    if (loading) { return <Loading /> };

    return (
        <>
            <div className="character-creation-elements my-4 max-w-full">
                <div className="character-creation-card-container flex flex-col gap-10">
                    <div className="flex justify-center"><Card type={IBackgroundType.TRAIT} /></div>
                    <div className="flex justify-center"><Card type={IBackgroundType.BOND} /></div>
                    <div className="flex justify-center"><Card type={IBackgroundType.FLAW} /></div>
                    <div className="flex justify-center"><Card type={IBackgroundType.IDEAL} /></div>
                </div>
                <div className="character-creation-buttons-container flex flex-col items-center gap-4 mt-10">
                    <WideButton buttonText={"Interpret"} onClick={handleInterpret} />
                    <WideButton buttonText={"Randomize All"} onClick={handleRandomizeAll} />
                    <WideButton buttonText={"Finish character"} onClick={handleFinishCharacter} />
                </div>
            </div>
            <DescriptionModal modalRef={modalRef} description={description} AcceptDescription={AcceptDescription} CancelDescription={CancelDescription} />
            {showToast && (
                <div className="toast toast-end">
                    <div className="alert alert-error">
                        <span>Please select all traits before continuing</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default CharacterCards;