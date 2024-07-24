import s from './styles.module.css'

type HeadPartProps = {
    children?: React.ReactNode
    style?: React.CSSProperties
}

const HeadPart: React.FC<HeadPartProps> = ({ children, style }) => {
    return (
        <div className={s.headPart} style={style}>
            {children}
        </div>
    )
}

export default HeadPart;