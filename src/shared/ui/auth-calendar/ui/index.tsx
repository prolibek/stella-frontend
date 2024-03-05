import React, { useState } from 'react';

import s from './styles.module.css';

type AuthCalendarInputProps = {
    title: string;
    onChange: () => void | null;
    value: string | undefined;
}

export const AuthCalendarInput:React.FC<AuthCalendarInputProps> = ({title, value, onChange}) => {
    const [inpType, setInpType] = useState('text');

    return (
        <input
            placeholder={title}
            className={s.calendar}
            type={inpType}
            onFocus={() => {
                setInpType('date')
            }}
            onBlur={() => {
                setInpType('text')
            }}
            value={value}
            onChange={onChange}
            id="date" 
        />
    )
}