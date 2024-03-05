import React from 'react';

import s from './style.module.css';

type AuthButtonProps = {
    text: string;
    onClick: () => void | null;
}

export const AuthButton:React.FC<AuthButtonProps> = ({text, onClick}) => {
    return (
        <button className={s.btn} onClick={onClick}>{text}</button>
    )
}