import s from './styles.module.css'

type BlueButtonProps = {
    onClick: () => void | null,
    style: any,
    text: string
}

const BlueButton: React.FC<BlueButtonProps> = ({
    onClick, style, text
}) => {
    return (
        <button
            className={s.btn}
            style={style} 
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default BlueButton;