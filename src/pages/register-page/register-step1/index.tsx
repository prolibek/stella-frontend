import s from './styles.module.css';

import { AuthTextInput } from '@/shared/ui/auth-input';

const FirstStep = () => {
    return (
        <div className={s.form}>
            <AuthTextInput text="Email"/>
            <AuthTextInput text="Password"/>
            <AuthTextInput text="Repeat password"/>
        </div>
    )
}

export default FirstStep;