import { useBackgroundContext } from "../../context/BackgroundContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { IBackgroundType } from "../../../../common/types/background-type-interface";
import { IBackground } from "../../../../common/types/background-interface";
import CollapsedOptions from "./CollapsedOptions";
import AddBackgroundModal from "./AddBackgroundModal";
import Icon from "./BackgroundIcons";

interface CardProps {
    type: IBackgroundType;
};

const Card = ({ type }: CardProps) => {
    const { getRandomBackground, addUserBackground, togglePinned, setOneBackground, currentBackgrounds, pinnedBackgrounds } = useBackgroundContext();
    const { user } = useAuth();
    const [background, setBackground] = useState<IBackground | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (currentBackgrounds[type]) {
            setBackground(currentBackgrounds[type]);
        }
    }, [currentBackgrounds, type]);

    const handleClick = async () => {
        if (pinnedBackgrounds[type]) { return };
        const data = await getRandomBackground(type);
        if (data) {
            setBackground(data);
            setOneBackground(data, type);
        }
    };

    const handleSubmitNewBackground = (createdBackground: IBackground) => {
        try {
            addUserBackground(createdBackground);
            setBackground(createdBackground);
            handleCloseModal();
        } catch (error) {
            console.error("Error adding background", error);
        }
    };

    const handlePin = () => {
        togglePinned(type);
    };

    const handleAddBackground = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="card-elements">
            <div className="card-title flex justify-center prose my-2">
                <Icon type={type}/><div className="font-light">{type.toUpperCase()}</div><Icon type={type}/>
            </div>
            <div className="flex flex-col gap-2">
                <a onClick={handleClick} aria-label={`Get random ${type}`} tabIndex={0} data-testid="card-link">
                    <div className="card bg-neutral text-neutral-content w-80 h-36">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{background ? background.title : '?'}</h2>
                            <p>{background ? background.description : '???'}</p>
                        </div>
                    </div>
                </a>
                <div className="card-buttons flex gap-2 justify-center">
                    <div className="flex gap-2 justify-center items-center">
                        <button data-testid="pin-button" className={`btn btn-circle btn-sm pin text-xs ${pinnedBackgrounds[type] ? "bg-red-500" : ""}`} onClick={handlePin}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                        </button>

                        <button disabled={!user} data-testid="add-background-button" className="btn btn-circle btn-sm addBackground text-xs" onClick={handleAddBackground}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                            </svg>
                        </button>
                        <CollapsedOptions type={type} />
                    </div>
                </div>
                <div className="card-modal">
                    <AddBackgroundModal type={type} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitNewBackground} />
                </div>
            </div>
        </div>
    );
};

export default Card;
