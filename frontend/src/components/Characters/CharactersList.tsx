import { useEffect, useRef, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import Loading from "../../components/Loading/Loading";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";

const CharactersList: React.FC = () => {
    const { removeCharacter, characters, getUserCharacters } = useCharacterContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [characterDeletingId, setCharacterDeletingId] = useState<number | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCharaters = async () => {
            setLoading(true);
            try {
                await getUserCharacters();
                setLoading(false);
            } catch (error) {
                console.error("Failed to load characters:", error);
            }
        };

        fetchCharaters();
    }, []);

    const handleConfirmDelete = () => {
        if (characterDeletingId) {
            removeCharacter(characterDeletingId)
            modalRef.current?.close();
            setCharacterDeletingId(null);
        }
    };

    const handleCancelDelete = () => {
        modalRef.current?.close();
        setCharacterDeletingId(null);
    };

    const handleDeleteClick = (characterId: number) => {
        setCharacterDeletingId(characterId);
        modalRef.current?.showModal();
    };

    const handleNavigateToInfo = (characterId: number) => {
        navigate(`/dashboard/character/${characterId}`);
    };


    if (loading) return <Loading />;

    return (
        <>
            <div className="user-dashboard-elements">
                <div className="user-dashboard-button flex justify-start px-2">
                    <button className="btn btn-circle mx-3" onClick={() => navigate("/")}>
                        <svg className="h-6 w-6 fill-current md:h-8 md:w-8 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                    </button>
                </div>
                <div className="user-dashboard-main flex justify-center">
                    <ul className="list flex flex-col gap-5 max-w-md">
                        <li className="p-4 pb-2 text-md opacity-60 tracking-wide"><h1>Your characters</h1></li>
                        {characters.map(character => (
                            <li key={character.id} className="list-row bg-base-100 rounded-box shadow-md p-4">
                                <div className="list-character-info flex flex-row items-center justify-between gap-7">
                                    <div className="list-text text-start flex flex-col gap-5">
                                        <div>
                                            <div className="character-name text-xs uppercase font-semibold opacity-60"><h2>{character.name}</h2></div>
                                        </div>
                                        <p className="character-description list-col-wrap text-xs line-clamp-2">
                                            {character.description === null ? `This is your character ${character.name}` : character.description}
                                        </p>
                                    </div>
                                    <div className="lists-text-buttons flex">
                                        <button className="btn btn-square btn-ghost" onClick={() => { handleNavigateToInfo(character.id!) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </button>
                                        <button className="btn btn-square btn-ghost" onClick={() => { handleDeleteClick(character.id!) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <DeleteModal modalRef={modalRef} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} />
            </div>
        </>

    );
};

export default CharactersList;