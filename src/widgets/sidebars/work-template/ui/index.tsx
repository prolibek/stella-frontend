import s from './styles.module.css';

type WorkSidebarTemplateProps = {
    children?: React.ReactNode;
}

export const WorkSidebarTemplate:React.FC<WorkSidebarTemplateProps> = ({ children }) => {
    return (
        <div className={s.sidebar}>
            <div className={s.sidebarContent}>
                {children}
            </div>
        </div>
    )
}