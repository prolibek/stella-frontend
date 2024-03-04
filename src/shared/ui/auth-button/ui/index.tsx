import React from 'react';

import s from './style.module.css';

type AuthButtonProps = {
    text: string;
}

export const AuthButton:React.FC<AuthButtonProps> = ({text}) => {
    return (
        <button className={s.btn}>{text}</button>
    )
}