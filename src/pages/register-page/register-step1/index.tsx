import React from 'react'
import s from './styles.module.css';

import { AuthTextInput } from '@/shared/ui/auth-input';

type FirstStepProps = {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    repeatPassword: string;
    setRepeatPassword: (val: string) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({
    email, setEmail,
    password, setPassword,
    repeatPassword, setRepeatPassword
}) => {

    return (
        <div className={s.form}>
            <AuthTextInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }} 
                value={email}
                text="Email"
            />
            <AuthTextInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }} 
                value={password}
                type="password" 
                text="Password"
            />
            <AuthTextInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setRepeatPassword(e.target.value)
                    console.log(password)
                }} 
                value={repeatPassword}
                type="password" 
                text="Repeat password"
            />
        </div>
    )
}

export default FirstStep;