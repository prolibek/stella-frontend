import React from "react"

import s from "./styles.module.css"

type AuthTextInputProps = {
    text: string;
};

export const AuthTextInput: React.FC<AuthTextInputProps> = ({text}) => {
    return (
        <input type="text" placeholder={text} className={s.inp}/>
    )
}