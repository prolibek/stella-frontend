import s from './styles.module.css';

import { AuthTextInput } from '@/shared/ui/auth-input';
import { AuthButton } from '@/shared/ui/auth-button';

const FirstStep = () => {
    return (
        <div className={s.form}>
            <AuthTextInput text="Email"/>
            <AuthTextInput text="Password"/>
            <AuthTextInput text="Repeat password"/>
            <AuthButton text="Next"/>
        </div>
    )
}

export default FirstStep;