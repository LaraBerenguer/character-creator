import { RefObject } from "react";

interface DeleteModalProps {
    modalRef: RefObject<HTMLDialogElement | null>;
    handleConfirmDelete: () => void;
    handleCancelDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ modalRef, handleConfirmDelete, handleCancelDelete }) => {

    return (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">There's no coming back...</h3>
                <p className="py-4">Are you sure you want to delete this character?</p>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={handleConfirmDelete}>Delete</button>
                    <button className="btn" onClick={handleCancelDelete}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
};

export default DeleteModal;