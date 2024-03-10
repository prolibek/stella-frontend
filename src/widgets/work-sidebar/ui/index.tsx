import s from './styles.module.css';

export const Sidebar = () => {
    return (
        <div className={s.sidebar}>
            <div className={s.orgInfo}>
                <img />
                <h1>Organisation</h1>
            </div>
            <button className={s.sidebarBtn}>
                Resumes
            </button>
            <button className={s.sidebarBtn}>
                Vacancies
            </button>
            <button className={s.sidebarBtn}>
                Applications
            </button>
            <button className={s.sidebarBtn}>
                Analytics
            </button>
        </div>
    )
}