// SelectChoiceComponent.tsx
import React, { useState } from 'react';
import s from './styles.module.css';

type AuthChoiceInputComponentProps = {
    options: string[]; 
    placeholder?: string; 
};

export const AuthChoiceInput: React.FC<AuthChoiceInputComponentProps> = ({ options, placeholder }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className={s["select-choice-container"]}>
            <select
                value={selectedOption}
                onChange={handleSelectChange}
                className={s["select-inp"]}
                defaultValue=""
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option} className={s.option}>{option}</option>
                ))}
            </select>
        </div>
    );
};
