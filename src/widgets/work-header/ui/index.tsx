import { useState, useRef, useEffect } from 'react';
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
    const menuRef = useRef(); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false); 
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div className={s.header}>
            <div className={s.headerContainer}>
                <div className={s.logo}>
                    <StellaLogo/>
                </div>
                <div className={s.rightPart}>
                    <img
                        src='/images/notification.png'
                        className={s.iconImg}
                    />
                    <div className={s.profileIcon}>
                        <img 
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                            src="/images/userIcon.png"
                            className={s.iconImg}
                        />
                        {   
                            isOpen &&
                            <div 
                                ref={menuRef} className={s.profileMenu}
                            >
                                <button className={s.menuButton}>
                                    <div className={s.innerMenuButton}>
                                        <div className={s.viewProfile}>
                                            <img src="/images/userIcon.png" className={s.userIcon}/>
                                            <div className={s.emailAndName}>
                                                <span className={s.fullName}>
                                                    { user.first_name } { user.last_name }
                                                </span>
                                                <span className={s.email}>
                                                    { user.email }
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
        </div>
    )
}