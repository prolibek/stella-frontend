import LandingLayout from '@/pages/layouts/landing-layout';
import s from './styles.module.css';
import { AuthTextInput } from '@/shared/ui/auth-input';
import { AuthButton } from '@/shared/ui/auth-button';
import { useState } from 'react';
import { validateEmail } from '@/features/auth/lib/validateEmail';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '@/features/auth/api/authService';
import { login } from '@/features/auth/slice';

export const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState({
        email: '', password: ''
    })

    const handleSignIn = async () => {
        let errs = { email: '', password: '' }

        if(!email.trim()) {
            errs.email = 'Email field is empty.';
        } else if(!validateEmail(email)) {
            errs.email = 'Enter valid email address';
        }
        if(!password.trim()) {
            errs.password = 'Password field is empty.';
        }

        setErrors(errs);
        if(errors.email || errors.password) return ;

        try {
            const response = await AuthService.login({
                email: email, 
                password: password
            });
            
            dispatch(login({
                accessToken: response.access_token,
                user: response.user
            }));
    
            navigate('/dashboard');
        } catch {
            setErrors({ email: '', password: 'Incorrect email or password.' });
            return ;
        }
    }

    return (
        <LandingLayout>
            <div className={s.wrapper}>
                <h1>Sign In</h1>
                <AuthTextInput
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value)
                    }} 
                    text="Email"
                />
                <p className={s.error}>{errors.email}</p>
                <AuthTextInput
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value)
                    }} 
                    type="password" 
                    text="Password"
                />
                <p className={s.error}>{errors.password}</p>
                <AuthButton
                    onClick={handleSignIn} 
                    text="Sign In"
                />
            </div>
        </LandingLayout>
    )
}