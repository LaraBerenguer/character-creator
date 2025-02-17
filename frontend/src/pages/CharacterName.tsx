const CharacterName = () => {
    return (
        <div className="name-page flex justify-center my-5 min-h-screen">
            <div className="name-page-elements flex flex-col gap-5">
                <div className="name-form flex flex-col gap-4">
                    <div className="name-text">What's your character's Name?</div>
                    <input type="text" placeholder="Your name" className="input w-full max-w-xs" />
                </div>
                <div className="name-buttons flex gap-2 justify-center">
                    <button className="btn btn-primary">Generate</button>
                    <button className="btn btn-primary">Accept</button>
                </div>
            </div>

        </div>
    );
};

export default CharacterName;