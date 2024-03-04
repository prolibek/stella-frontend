import LandingLayout from '@/pages/layouts/landing-layout';
import s from './style.module.css';
import FirstStep from '../register-step1';
import { AuthChoiceInput } from '@/shared/ui/auth-choice';

export const RegisterPage = () => {
    return (
        <LandingLayout>
            <div className={s.wrapper}>
                <h1>Register</h1>
                <FirstStep/>
                <AuthChoiceInput
                    options={[
                        "HR",
                        "Manager"
                    ]}
                    placeholder="Select your position"
                />
            </div>
        </LandingLayout>
    )
}