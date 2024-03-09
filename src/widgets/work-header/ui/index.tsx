import { useState } from 'react';
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';

import StellaLogo from '@/shared/ui/stella-logo';
import AuthService from '@/features/auth/api/authService';
import { logout } from '@/features/auth/slice';
import { useNavigate } from 'react-router-dom';

export const WorkHeader = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className={s.header}>
            <div className={s.headerContainer}>
                <div className={s.logo}>
                    <StellaLogo/>
                </div>
                <div className={s.profileIcon}>
                    <img 
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                        src="images/userIcon.png"
                        className={s.iconImg}
                    />
                    {   
                        isOpen &&
                        <div 
                            className={s.profileMenu}
                        >
                            <button className={s.menuButton}>
                                <div className={s.innerMenuButton}>
                                    <div className={s.viewProfile}>
                                        <img src="images/userIcon.png" className={s.userIcon}/>
                                        <div className={s.emailAndName}>
                                            <span className={s.fullName}>
                                            </span>
                                            <span className={s.email}>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <div className={s.menuBlock}>
                                <button className={s.menuButton}>
                                    <div className={s.innerMenuButton}>
                                        <span>Settings</span>
                                    </div>
                                </button>
                            </div>
                            <div className={s.menuBlock}>
                                <button 
                                    onClick={async () => {
                                        await AuthService.logout();
                                        localStorage.removeItem('access_token');
                                        dispatch(logout());
                                        navigate("/");
                                    }}
                                    className={s.menuButton}
                                >
                                    <div className={s.innerMenuButton}>
                                        <span>Log out</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}