import { RefObject } from "react";

interface DescriptionModalProps {
    modalRef: RefObject<HTMLDialogElement | null>;
    description: string;
    AcceptDescription: () => void;
    CancelDescription: () => void;
};

const DescriptionModal: React.FC<DescriptionModalProps> = ({ AcceptDescription, CancelDescription, modalRef, description }) => {

    return (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <p className="py-4">{description}</p>
                <div className="modal-action">
                    <button className="btn" onClick={AcceptDescription}>I like it</button>
                    <button className="btn" onClick={CancelDescription}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
};

export default DescriptionModal;