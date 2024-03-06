// SelectChoiceComponent.tsx
import React, { useState } from 'react';
import s from './styles.module.css';

type Position = {
    id: number;
    name: string;
}

type AuthSelectInputComponentProps = {
    options: Position[]; 
    placeholder?: string; 
    onChange: () => void | null;
    value: string | undefined;
};

export const AuthSelect: React.FC<AuthSelectInputComponentProps> = ({ options, placeholder, onChange, value }) => {

    return (
        <div className={s["select-choice-container"]}>
            <select
                value={value}
                onChange={onChange}
                className={s["select-inp"]}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.id} value={option.id} className={s.option}>{option.name}</option>
                ))}
            </select>
        </div>
    );
};
