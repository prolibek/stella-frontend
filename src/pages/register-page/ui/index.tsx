import LandingLayout from '@/pages/layouts/landing-layout';
import s from './style.module.css';
import FirstStep from '../register-step1';
import SecondStep from '../register-step2';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AuthButton } from '@/shared/ui/auth-button';
import { useNavigate } from 'react-router-dom';
import { validateStepOne, validateStepTwo } from '../lib/validationLogic';
import AuthService from '@/features/auth/api/authService';
import { login } from '@/features/auth/slice';

export const RegisterPage = () => {
    const dispatch = useDispatch();
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
    
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ middleName, setMiddleName ] = useState("");
    const [ date, setDate ] = useState("");
    const [ pos, setPos ] = useState("");
    
    const [ secondStepErrors, setSecondStepErrors ] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
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
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            middleName={middleName}
            setMiddleName={setMiddleName}
            errors={secondStepErrors}
        />
    ]

    const goToNextStep = async () => {
        if (curr === 0) {
            let errors = validateStepOne(email, password, repeatPassword);
            setFirstStepErrors(errors);
            if (errors.email || errors.password || errors.repeatPassword) {
                return;
            }
        }

        if (curr === 1) {
            const errors = validateStepTwo(firstName, lastName, pos, date);
            setSecondStepErrors(errors);
            if(errors.firstName || errors.lastName || errors.pos || errors.date) {
                return;
            }

            const userData = {
                email: email,
                password: password,
                birth_date: date || null,
                role: Number(pos),
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName
            }

            try {
                const response = await AuthService.register(userData);

                dispatch(login({
                    accessToken: response.access_token,
                    user: response.user
                }))
            
                navigate('/dashboard');
            } catch(error) {
                console.log(userData)
                console.log(error)
                setSecondStepErrors({...secondStepErrors, date: "Account already exists."})
            }
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