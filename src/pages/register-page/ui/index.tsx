import LandingLayout from '@/pages/layouts/landing-layout';
import s from './style.module.css';
import FirstStep from '../register-step1';
import SecondStep from '../register-step2';
import { useState } from 'react';
import { AuthButton } from '@/shared/ui/auth-button';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [ curr, setCurr ] = useState(0)

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatPassword, setRepeatPassword ] = useState("");
    
    const [ date, setDate ] = useState("");
    const [ pos, setPos ] = useState("");
    
    const steps = [
        <FirstStep
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
        />,
        <SecondStep
            date={date}
            setDate={setDate}
            pos={pos}
            setPos={setPos}
        />
    ]

    return (
        <LandingLayout>
            <div className={s.wrapper}>
                <h1>Register</h1>
                {
                    steps[curr]
                }
                <div className={s.btns}>
                    {
                        curr > 0 &&
                        <button
                            onClick={()=>{
                                setCurr(curr-1);
                                console.log(curr);
                            }} 
                            className={s.backBtn}
                        >
                            Back
                        </button>
                    }
                    <AuthButton
                        onClick={()=>{
                            if(curr===1) {
                                navigate('/dashboard')
                            }
                            setCurr(curr+1);
                            console.log(curr);
                        }} 
                        text="Next"
                    />
                </div>
            </div>
        </LandingLayout>
    )
}