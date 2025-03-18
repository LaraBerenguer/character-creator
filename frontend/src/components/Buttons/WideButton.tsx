interface WideButtonProps {
    buttonText: string;
    onClick?: () => void;
}

const WideButton = ({ buttonText, onClick }: WideButtonProps) => {
    return (
        <button className="btn btn-wide" onClick={onClick}>{buttonText}</button>
    );
};

export default WideButton;