import { useBackgroundContext } from "../../context/BackgroundContext";
import { useEffect, useState } from "react";
import { IBackgroundType } from "../../../../common/types/background-type-interface";
import { IBackground } from "../../../../common/types/background-interface";
import CollapsedOptions from "./CollapsedOptions";
import AddBackgroundModal from "./AddBackgroundModal";

interface CardProps {
    type: IBackgroundType;
};

const Card = ({ type }: CardProps) => {
    const { getRandomBackground, addUserBackground, togglePinned, currentBackgrounds, pinnedBackgrounds } = useBackgroundContext();
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
                <div className="font-light">{type.toUpperCase()}</div>
            </div>
            <div className="flex flex-col">
                <a onClick={handleClick}>
                    <div className="card bg-neutral text-neutral-content w-96">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{background ? background.title : '?'}</h2>
                            <p>{background ? background.description : '???'}</p>
                        </div>
                    </div>
                </a>
                <div className="card-buttons flex gap-2 justify-center">
                    <button className={`btn pin text-xs ${pinnedBackgrounds[type] ? "bg-red-500" : ""}`} onClick={handlePin}>
                        {pinnedBackgrounds[type] ? "Unpin" : "Pin"}
                    </button>
                    <button className="btn addBackground text-xs" onClick={handleAddBackground}>
                        Add Background
                    </button>
                    <CollapsedOptions type={type} />
                </div>
                <div className="card-modal">
                    <AddBackgroundModal type={type} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitNewBackground} />
                </div>
            </div>
        </div>
    );
};

export default Card;
