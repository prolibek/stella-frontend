import React from "react"

import s from "./styles.module.css"

type AuthTextInputProps = {
    text: string;
    type: string;
    onChange: () => void | null;
    value: string;
    style: any;
};

const AuthTextInput: React.FC<AuthTextInputProps> = (
    {
        text, 
        type="text",
        value,
        onChange,
        style
    }) => {
    return (
        <input 
            style={style}
            type={type} 
            placeholder={text} 
            className={s.inp}
            value={value}
            onChange={onChange}
        />
    )
}

export default AuthTextInput;