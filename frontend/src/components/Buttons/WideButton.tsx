interface WideButtonProps {
    buttonText: string;
    onClick?: () => void;
}

const WideButton = ({ buttonText, onClick }: WideButtonProps) => {
    return (
        <button className="btn btn-block" onClick={onClick}>{buttonText}</button>
    );
};

export default WideButton;