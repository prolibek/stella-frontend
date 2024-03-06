import React from 'react'
import s from './styles.module.css';

import { AuthTextInput } from '@/shared/ui/auth-input';

type errorsType = {
    email: string;
    password: string;
    repeatPassword: string;
}

type FirstStepProps = {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    repeatPassword: string;
    setRepeatPassword: (val: string) => void;
    errors: errorsType;
}

const FirstStep: React.FC<FirstStepProps> = ({
    email, setEmail,
    password, setPassword,
    repeatPassword, setRepeatPassword,
    errors
}) => {

    return (
        <div className={s.form}>
            <AuthTextInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }} 
                value={email}
                text="Email"
                className={s.inp}
            />
            <p className={s.error}>{errors.email}</p>
            <AuthTextInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }} 
                value={password}
                type="password" 
                text="Password"
                className={s.inp}
            />
            <p className={s.error}>{errors.password}</p>
            <AuthTextInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setRepeatPassword(e.target.value)
                }} 
                value={repeatPassword}
                type="password" 
                text="Repeat password"
                className={s.inp}
            />
            <p className={s.error}>{errors.repeatPassword}</p>
        </div>
    )
}

export default FirstStep;