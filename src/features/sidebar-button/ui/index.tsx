import s from './styles.module.css';
import { Link } from 'react-router-dom';

type SidebarButtonProps = {
    link: string;
    children?: React.ReactNode,

}

export const SidebarButton:React.FC<SidebarButtonProps> = ({ link, children }) => {
    return (
        <Link 
            to={link}
            className={s.sidebarBtnContainer} 
        >
            <button
                className={s.sidebarBtn}
            >
                {children}
            </button>
        </Link>
    )
}