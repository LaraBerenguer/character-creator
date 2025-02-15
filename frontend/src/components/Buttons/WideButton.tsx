interface WideButtonProps {
    buttonText: string;}

const WideButton = ({ buttonText }: WideButtonProps) => {
    return (
        <button className="btn btn-block">{buttonText}</button>
    );
};

export default WideButton;