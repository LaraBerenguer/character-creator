import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPendingCharacter } from "../../../../common/types/pending-character-interface";
import { useCharacterContext } from "../../context/CharacterContext";


const NameInput = () => {
    const { setPendingCharacter } = useCharacterContext();
    const [name, setName] = useState("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleNameCharacter = () => {
        if (!name.trim()) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        const character: IPendingCharacter = {
            name: name
        };

        setPendingCharacter(character);
        navigate("/creation");
    };

    return (
        <div>
            <div className="name-page-button flex justify-start px-2">
                <button className="btn btn-circle px-2 my-4" onClick={() => navigate("/")}>
                    <svg className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                </button>
            </div>
            <div className="name-page flex justify-center my-5 h-full">
                <div className="name-page-elements flex flex-col gap-5 translate-y-[40%]">
                    <div className="name-form flex flex-col gap-4">
                        <div className="name-text"><h2>What's your character's Name?</h2></div>
                        <input type="text" placeholder="Your name" value={name} onChange={handleNameChange} className="input w-full max-w-xs" />
                    </div>
                    <div className="name-buttons flex gap-2 justify-center">
                        <button disabled className="btn btn-primary">Generate</button>
                        <button className="btn btn-primary" onClick={handleNameCharacter}>Accept</button>
                    </div>
                </div>

            </div>
            {showToast && (
                <div className="toast toast-end">
                    <div className="alert alert-error">
                        <span>Please enter a Character Name.</span>
                    </div>
                </div>
            )}
        </div>

    );
};

export default NameInput;