import s from './styles.module.css'

type HeadPartProps = {
    children?: React.ReactNode
}

const HeadPart: React.FC<HeadPartProps> = ({ children }) => {
    return (
        <div className={s.headPart}>
            {children}
        </div>
    )
}

export default HeadPart;