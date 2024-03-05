import LandingLayout from '@/pages/layouts/landing-layout';
import s from './styles.module.css';
import { AuthTextInput } from '@/shared/ui/auth-input';
import { AuthButton } from '@/shared/ui/auth-button';

export const SignInPage = () => {
    return (
        <LandingLayout>
            <div className={s.wrapper}>
                <h1>Sign In</h1>
                <AuthTextInput text="Email"/>
                <AuthTextInput type="password" text="Password"/>
                <AuthButton text="Sign In"/>
            </div>
        </LandingLayout>
    )
}