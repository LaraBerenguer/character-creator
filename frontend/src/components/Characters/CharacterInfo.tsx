import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICharacter } from "../../../../common/types/character-interface";
import { useCharacterContext } from "../../context/CharacterContext";

const CharacterInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);
    const { characters } = useCharacterContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && characters.length > 0) {
            const foundCharacter = characters.find(char => char.id === Number(id));
            setCurrentCharacter(foundCharacter || null);            
        }
    }, [id, characters]);

    return (
        <>
            <div className="character-info-elements flex flex-col gap-3">
                <div className="character-info-button flex justify-start px-2">
                    <button className="btn btn-circle mx-3" onClick={() => navigate("/dashboard")}>
                        <svg className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                    </button>
                </div>
                <div className="character-info-cards flex flex-col gap-5 md:items-center">
                    <div className="card bg-neutral text-neutral-content w-full">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-3xl">{currentCharacter?.name}</h2>
                            <p>{currentCharacter?.description === null ? `${currentCharacter.name} is not part of the legend... yet!` : currentCharacter?.description}</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-row">
                        <div className="card bg-neutral text-neutral-content w-96">
                            <div className="card-body items-center text-center">
                                <h2>TRAIT</h2>
                                <h2 className="card-title">{currentCharacter?.trait.title}</h2>
                                <p>{currentCharacter?.trait.description}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                        <div className="card bg-neutral text-neutral-content w-96">
                            <div className="card-body items-center text-center">
                                <h2>BOND</h2>
                                <h2 className="card-title">{currentCharacter?.bond.title}</h2>
                                <p>{currentCharacter?.bond.description}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-row">
                        <div className="card bg-neutral text-neutral-content w-96">
                            <div className="card-body items-center text-center">
                                <h2>FLAW</h2>
                                <h2 className="card-title">{currentCharacter?.flaw.title}</h2>
                                <p>{currentCharacter?.flaw.description}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                        <div className="card bg-neutral text-neutral-content w-96">
                            <div className="card-body items-center text-center">
                                <h2>IDEAL</h2>
                                <h2 className="card-title">{currentCharacter?.ideal.title}</h2>
                                <p>{currentCharacter?.ideal.description}</p>
                                <div className="card-actions justify-end">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CharacterInfo;
