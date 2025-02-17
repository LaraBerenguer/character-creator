import { useBackgroundContext } from "../context/BackgroundContext";
import { useEffect, useRef, useState } from "react";
import { IBackgroundType } from "../types/background-type-interface";
import { IBackground } from "../types/background-interface";

interface CardProps {
    type: IBackgroundType;
};

const Card = ({ type }: CardProps) => {
    const { getRandomBackground, addUserBackground, togglePinned, currentBackgrounds, pinnedBackgrounds } = useBackgroundContext();
    const [background, setBackground] = useState<IBackground | null>(null);
    const [newBackground, setNewBackground] = useState<Partial<IBackground>>({ title: "", description: "" });
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleClick = async () => {
        if (pinnedBackgrounds[type]) {return};
        const data = await getRandomBackground(type);
        if (data) {
            setBackground(data);
        }
    };

    useEffect(() => {
        if (currentBackgrounds[type]) {
            setBackground(currentBackgrounds[type]);
        }
    }, [currentBackgrounds, type]);

    const handlePin = () => {
        togglePinned(type);
    };

    const handleAddBackground = () => {
        modalRef.current?.showModal();
    };

    const handleCloseModal = () => {
        modalRef.current?.close();
        setNewBackground({ title: "", description: "" });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBackground(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitNewBackground = (e: React.FormEvent) => {
        e.preventDefault();
        const createdBackground: IBackground = {
            id: Date.now(),
            type: type,
            title: newBackground.title || "",
            description: newBackground.description || "",
        };

        try {
            addUserBackground(createdBackground);
            setBackground(createdBackground);
            handleCloseModal();
        } catch (error) {
            console.error("Error adding background", error);
        }
    };

    return (
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
                <button className="btn showAll text-xs">
                    Show options
                </button>
            </div>
            <div className="card-modal">
                <dialog ref={modalRef} id={`modal_${type}`} className="modal modal-bottom sm:modal-middle">
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
                                <button type="button" className="btn" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Card;
