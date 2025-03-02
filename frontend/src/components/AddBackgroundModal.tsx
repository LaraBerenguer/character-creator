import { useEffect, useRef, useState } from "react";
import { IBackground } from "../../../common/types/background-interface";
import { IBackgroundType } from "../../../common/types/background-type-interface";

interface AddBackgroundModalProps {
    type: IBackgroundType;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (background: IBackground) => void;
}

const AddBackgroundModal = ({ type, isOpen, onClose, onSubmit }: AddBackgroundModalProps) => {
    const [newBackground, setNewBackground] = useState<Partial<IBackground>>({ title: "", description: "" });
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewBackground(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitNewBackground = (e: React.FormEvent) => {
        e.preventDefault();
        const createdBackground: IBackground = {            
            type: type,
            title: newBackground.title || "",
            description: newBackground.description || "",
        };

        try {
            onSubmit(createdBackground);
            setNewBackground({ title: "", description: "" });
        } catch (error) {
            console.error("Error adding your background", error);
        }
    };

    return (
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
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default AddBackgroundModal;