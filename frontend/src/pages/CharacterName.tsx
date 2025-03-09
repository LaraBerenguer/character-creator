import { useNavigate } from "react-router-dom";
import { useCharacterContext } from "../context/CharacterContext";
import { useState } from "react";

const CharacterName = () => {
    const { pendingCharacter, clearPendingCharacter, createCharacter, } = useCharacterContext();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleFinishCharacter = () => {
        setName(name);

        if (!pendingCharacter) {
            alert("Sorry ): Something went wrong");
            navigate('/creation');
            return;
        };

        if (!name) {
            alert("Please enter a character name");
            return;
        }

        const finalCharacter = {
            ...pendingCharacter,
            name: name,
            trait_id: pendingCharacter.trait.id,
            flaw_id: pendingCharacter.flaw.id,
            bond_id: pendingCharacter.bond.id,
            ideal_id: pendingCharacter.ideal.id
        };

        createCharacter(finalCharacter);
        clearPendingCharacter();
        navigate("/dashboard");
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
                    <button className="btn btn-primary" onClick={handleFinishCharacter}>Accept</button>
                </div>
            </div>

        </div>
    );
};

export default CharacterName;