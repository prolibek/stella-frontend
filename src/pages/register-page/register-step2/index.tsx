import { AuthCalendarInput } from '@/shared/ui/auth-calendar';
import { AuthSelect } from '@/shared/ui/auth-select';
import s from './styles.module.css';
type SecondStepProps = {
    date: string;
    setDate: (val: string) => void;
    pos: string;
    setPos: (val: string) => void;
}

export const SecondStep:React.FC<SecondStepProps> = ({
    date, setDate, 
    pos, setPos
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
            <AuthCalendarInput
                title="Date of birth"
                value={date}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        setDate(e.target.value)
                    }
                }
            />
            <p>
                By registering, I accept the privacy policy, user agreement and agree to the processing of personal data
            </p>
        </div>
    )
}

export default SecondStep;