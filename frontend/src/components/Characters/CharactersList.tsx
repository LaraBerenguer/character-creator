import { useCharacterContext } from "../../context/CharacterContext";

const mockCharacters = [
    { id: 101, name: "Flitz Sacudelibros", description: "Test character 1" },
    { id: 102, name: "Quiatra Laoch", description: "Test character 2" },
    { id: 103, name: "Rèidh Ómara", description: "Test character 3" }
];

const charactersList = () => {
    const { removeCharacter } = useCharacterContext();

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        removeCharacter(id);
    };

    return (
        <div className="user-dashboard-elements">
            <div className="user-dashboard-main flex justify-center">
                <ul className="list flex flex-col gap-5 max-w-md">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your characters</li>
                    {mockCharacters.map(mock => (
                        <li key={mock.id} className="list-row bg-base-100 rounded-box shadow-md p-4">
                            <div className="list-character-info flex flex-row items-center">
                                <div className="list-text text-start flex flex-col gap-5">
                                    <div>
                                        <div className="character-name text-xs uppercase font-semibold opacity-60">{mock.name}</div>
                                    </div>
                                    <p className="character-description list-col-wrap text-xs">
                                        {mock.description}
                                    </p>
                                </div>
                                <button className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                                <button className="btn btn-square btn-ghost" onClick={(e) => { handleDelete(e, mock.id) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default charactersList;