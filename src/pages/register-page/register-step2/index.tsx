import { AuthCalendarInput } from '@/shared/ui/auth-calendar';
import { AuthSelect } from '@/shared/ui/auth-select';
import s from './styles.module.css';

type errorsType = {
    date: string;
    pos: string;
}

type SecondStepProps = {
    date: string;
    setDate: (val: string) => void;
    pos: string;
    setPos: (val: string) => void;
    errors: errorsType;
}

export const SecondStep:React.FC<SecondStepProps> = ({
    date, setDate, 
    pos, setPos,
    errors
}) => {
    return (
        <div className={s.form}>
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