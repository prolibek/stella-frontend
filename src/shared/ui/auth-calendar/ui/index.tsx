import React, { useState } from 'react';

import s from './styles.module.css';

type AuthCalendarInputProps = {
    title: string;
}

export const AuthCalendarInput:React.FC<AuthCalendarInputProps> = ({title}) => {
    const [inpType, setInpType] = useState('text');

    return (
        <input
            placeholder={title}
            className={s.calendar}
            type={inpType}
            onFocus={(e) => {
                setInpType('date')
            }}
            onBlur={() => setInpType('text')}
            id="date" 
        />
    )
}