const charactersList = () => {
    return (
        <div className="user-dashboard-elements">
            <div className="user-dashboard-main flex justify-center">
                <ul className="list flex flex-col gap-5 max-w-md">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your characters</li>
                    <li className="list-row bg-base-100 rounded-box shadow-md p-4">
                        <div className="list-character-info flex flex-row items-center">
                            <div className="list-text text-start flex flex-col gap-5">
                                <div>
                                    <div className="character-name text-xs uppercase font-semibold opacity-60">Flitz Sacudelibros</div>
                                </div>
                                <p className="character-description list-col-wrap text-xs">
                                    "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                                </p>
                            </div>
                            <button className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                        </div>
                    </li>
                    <li className="list-row bg-base-100 rounded-box shadow-md p-4">
                        <div className="list-character-info flex flex-row items-center">
                            <div className="list-text text-start flex flex-col gap-5">
                                <div>
                                    <div className="character-name text-xs uppercase font-semibold opacity-60">Quiatra Laoch</div>
                                </div>
                                <p className="character-description list-col-wrap text-xs">
                                    "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                                </p>
                            </div>
                            <button className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                        </div>
                    </li>
                    <li className="list-row bg-base-100 rounded-box shadow-md p-4">
                        <div className="list-character-info flex flex-row items-center">
                            <div className="list-text text-start flex flex-col gap-5">
                                <div>
                                    <div className="character-name text-xs uppercase font-semibold opacity-60">Rèidh Ómara</div>
                                </div>
                                <p className="character-description list-col-wrap text-xs">
                                    "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                                </p>
                            </div>
                            <button className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default charactersList;