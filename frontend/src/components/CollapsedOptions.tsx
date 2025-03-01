import { useEffect, useState } from "react";
import { useBackgroundContext } from "../context/BackgroundContext";
import { IBackgroundType } from "../../../common/types/background-type-interface";
import { IBackground } from "../../../common/types/background-interface";

interface CollapsedOptionsProps {
    type: IBackgroundType;
}

const CollapsedOptions = ({ type }: CollapsedOptionsProps) => {

    const { getByType, setOneBackground, currentBackgrounds } = useBackgroundContext();
    const [options, setOptions] = useState<IBackground[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const backgrounds = await getByType(type);
                setOptions(backgrounds);
            } catch (error) {
                console.error("Error fetching backgrounds:", error);
            }
        };

        fetchOptions();
    }, [type, getByType]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const selectedBackground = options.find(option => option.id === selectedId);
        if (selectedBackground) {
            setOneBackground(selectedBackground, type);
        };
    }

    return (
        <select className="select select-ghost w-full max-w-xs" onChange={handleSelect} value={currentBackgrounds[type]?.id || ""}>
<option value="" disabled>{type === "ideal" ? "Select an" : "Select a"} {type}</option>
            {options.map(option =>
                <option key={option.id} value={option.id}>{option.title}</option>
            )}
        </select>
    );
};

export default CollapsedOptions;