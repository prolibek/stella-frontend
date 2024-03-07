import React from "react"

import s from "./styles.module.css"

type AuthTextInputProps = {
    text: string;
    type: string;
    onChange: () => void | null;
    value: string;
};

const AuthTextInput: React.FC<AuthTextInputProps> = (
    {
        text, 
        type="text",
        value,
        onChange,
    }) => {
    return (
        <input 
            type={type} 
            placeholder={text} 
            className={s.inp}
            value={value}
            onChange={onChange}
        />
    )
}

export default AuthTextInput;