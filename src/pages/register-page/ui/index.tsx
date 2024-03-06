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

    const [ firstStepErrors, setFirstStepErrors ] = useState({
        email: '', 
        password: '', 
        repeatPassword: ''
    })
    
    const [ date, setDate ] = useState("");
    const [ pos, setPos ] = useState("");
    
    const [ secondStepErrors, setSecondStepErrors ] = useState({
        date: '',
        pos: ''
    })

    const steps = [
        <FirstStep
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            errors={firstStepErrors}
        />,
        <SecondStep
            date={date}
            setDate={setDate}
            pos={pos}
            setPos={setPos}
            errors={secondStepErrors}
        />
    ]

    const validateEmail = (email: string) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    };

    const goToNextStep = () => {
        if (curr === 0) {
            let errors = { email: '', password: '', repeatPassword: '' };
    
            if (!email) {
                errors.email = 'Email field is empty';
            } else if (!validateEmail(email)) {
                errors.email = 'Enter valid email address.';
            }
    
            if (!password) {
                errors.password = 'Password field is empty.';
            }
    
            if (password !== repeatPassword) {
                errors.repeatPassword = 'Passwords should match.';
            }
    
            setFirstStepErrors(errors);
    
            if (errors.email || errors.password || errors.repeatPassword) {
                return;
            }
        }

        if (curr === 1) {
            let errors = { pos: '', date: '' };

            if(!pos) {
                errors.pos = 'Choose your position.';
            }

            if(date) {
                let today = new Date();
                let tmpDate = new Date(date); 

                let diff = today.getFullYear() - tmpDate.getFullYear();

                if (tmpDate.getMonth() > today.getMonth() || 
                    (tmpDate.getMonth() === today.getMonth() && tmpDate.getDate() > today.getDate())) {
                    diff--;
                }

                if(diff <= 16 && diff >= 100)
                    errors.date = 'Enter valid age.' 
            }

            setSecondStepErrors(errors);

            if(errors.pos || errors.date) {
                return;
            }

            navigate('/dashboard');
        } else {
            setCurr(curr + 1);
        }
    };

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
                            }} 
                            className={s.backBtn}
                        >
                            Back
                        </button>
                    }
                    <AuthButton
                        onClick={goToNextStep} 
                        text="Next"
                    />
                </div>
            </div>
        </LandingLayout>
    )
}