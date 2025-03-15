import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPendingCharacter } from "../../../../common/types/pending-character-interface";
import { useCharacterContext } from "../../context/CharacterContext";


const NameInput = () => {
    const { setPendingCharacter } = useCharacterContext();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleNameCharacter = () => {
        if (!name.trim()) {
            alert("Please enter a character name");
            return;
        }

        const character: IPendingCharacter = {
            name: name
        };

        setPendingCharacter(character);
        navigate("/creation");
    };

    return (
        <div className="name-page flex justify-center my-5 min-h-screen">
            <div className="name-page-elements flex flex-col gap-5">
                <div className="name-form flex flex-col gap-4">
                    <div className="name-text">What's your character's Name?</div>
                    <input type="text" placeholder="Your name" value={name} onChange={handleNameChange} className="input w-full max-w-xs" />
                </div>
                <div className="name-buttons flex gap-2 justify-center">
                    <button disabled className="btn btn-primary">Generate</button>
                    <button className="btn btn-primary" onClick={handleNameCharacter}>Accept</button>
                </div>
            </div>

        </div>
    );
};

export default NameInput;