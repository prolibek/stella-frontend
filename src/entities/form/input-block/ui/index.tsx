import s from './styles.module.css'

type InputBlockProps = {
    title: string,
    children?: React.ReactNode
}

export const InputBlock:React.FC<InputBlockProps> = ({
    title, children
}) => {
    return (
        <div className={s.inputBlock}>
            <span className={s.formLabel}>{title}</span>
            {children}
        </div>
    )
}