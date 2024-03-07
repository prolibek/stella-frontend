import AuthCalendarInput from '@/shared/ui/auth-calendar';
import AuthSelect from '@/shared/ui/auth-select';
import s from './styles.module.css';
import AuthTextInput from '@/shared/ui/auth-input';

type errorsType = {
    firstName: string;
    lastName: string;
    middleName: string;
    date: string;
    pos: string;
}

type SecondStepProps = {
    firstName: string;
    setFirstName: (val: string) => void;
    lastName: string;
    setLastName: (val: string) => void;
    middleName: string;
    setMiddleName: (val: string) => void;
    date: string;
    setDate: (val: string) => void;
    pos: string;
    setPos: (val: string) => void;
    errors: errorsType;
}

export const SecondStep:React.FC<SecondStepProps> = ({
    firstName, setFirstName,
    lastName, setLastName,
    middleName, setMiddleName,
    date, setDate, 
    pos, setPos,
    errors
}) => {
    return (
        <div className={s.form}>
            <AuthTextInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstName(e.target.value)
                }} 
                value={firstName}
                text="First name"
                className={s.inp}
            />
            <p className={s.error}>{errors.firstName}</p>
            <AuthTextInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLastName(e.target.value)
                }} 
                value={lastName}
                text="Last name"
                className={s.inp}
            />
            <p className={s.error}>{errors.lastName}</p>
            <AuthTextInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMiddleName(e.target.value)
                }} 
                value={middleName}
                text="Middle name"
                className={s.inp}
            />
            <p className={s.error}>{errors.middleName}</p>
            <AuthSelect
                options={
                    [
                        {
                            id: 1,
                            name: "HR"
                        }, 
                        {
                            id: 2,
                            name: "Manager"
                        }
                    ]
                }
                placeholder="Position"
                value={pos}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        setPos(e.target.value)
                    }
                }
            />
            <p className={s.error}>{errors.pos}</p>
            <AuthCalendarInput
                title="Date of birth"
                value={date}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        setDate(e.target.value)
                    }
                }
            />
            <p className={s.error}>{errors.date}</p>
            <p className={s.agreement}>
                By registering, I accept the privacy policy, user agreement and agree to the processing of personal data
            </p>
        </div>
    )
}

export default SecondStep;