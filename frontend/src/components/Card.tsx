import { useId, useState } from "react";
import { IBackgroundType } from "../types/background-type-interface";
import { IBackground } from "../types/background-interface";

interface CardProps {
    type: IBackgroundType;
}

const Card = ({ type }: CardProps) => {
    const [background, setBackground] = useState<IBackground | null>(null);
    const [pinned, setPinned] = useState<boolean>(false);
    const [newBackground, setNewBackground] = useState<Partial<IBackground>>({ title: "", description: "" });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const uniqueId = useId();

    const getDataByType = async (type: IBackgroundType) => {
        const files = {
            [IBackgroundType.TRAIT]: '/src/api/mockup-data-traits.json',
            [IBackgroundType.BOND]: '/src/api/mockup-data-bonds.json',
            [IBackgroundType.FLAW]: '/src/api/mockup-data-flaws.json',
            [IBackgroundType.IDEAL]: '/src/api/mockup-data-ideals.json'
        };

        const response = await fetch(files[type]);
        const data = await response.json();
        return data[Math.floor(Math.random() * data.length)];
    }

    const handleClick = async () => {
        const data = await getDataByType(type);
        setBackground(data);
    };

    const handlePin = () => {
        setPinned(!pinned);
    };

    const handleAddBackground = () => {
        const modal = document.getElementById(`modal_${type}`) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewBackground({ title: "", description: "" })
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBackground(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitNewBackground = (e: React.FormEvent) => {
        e.preventDefault();
        const createdBackground: IBackground = {
            id: Number(uniqueId),
            type: type,
            title: newBackground.title || "",
            description: newBackground.description || "",
        }

        try {
            setBackground(createdBackground);
            handleCloseModal();
        } catch (error) {
            console.log("Error adding new background", error);
        };
    };

    return (
        <div className="flex flex-col">
            <a onClick={!pinned ? handleClick : undefined}>
                <div className="card bg-neutral text-neutral-content w-96">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{background ? background.title : '?'}</h2>
                        <p>{background ? background.description : '???'}</p>
                    </div>
                </div>
            </a>
            <div className="card-buttons">
                <button className="btn pin text-xs" onClick={handlePin}>
                    Pin
                </button>
                <button className="btn addBackground text-xs" onClick={handleAddBackground}>
                    Add Background
                </button>
                <button className="btn showAll text-xs">
                    Show options
                </button>
            </div>
            <div className="card-modal">
                <dialog id={`modal_${type}`} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add your own {type}</h3>
                        <form onSubmit={handleSubmitNewBackground} className="py-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBackground.title}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={newBackground.description}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered h-24"
                                    required
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Add</button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={handleCloseModal}>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Card;
