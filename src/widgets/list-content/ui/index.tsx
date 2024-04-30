import s from './styles.module.css'
type ListContentProps = {
    list: Element[],
    content: React.ReactNode
}

export const ListContent: React.FC<ListContentProps> = ({ list, content}) => {
    return (
        <div className={s.content}>
            <div className={s.vrList}>
                { list }
            </div>
            <div className={s.detailWindow}>
                { content }
            </div>
        </div>
    )
}