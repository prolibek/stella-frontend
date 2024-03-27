import s from './styles.module.css'

type BlueButtonProps = {
    onClick: () => void | null,
    style: any,
    children?: React.ReactNode
}

const BlueButton: React.FC<BlueButtonProps> = ({
    onClick, style, children
}) => {
    return (
        <button
            className={s.btn}
            style={style} 
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default BlueButton;