import { AuthCalendarInput } from '../../../shared/ui/auth-calendar';
import { AuthSelect } from '../../../shared/ui/auth-select';
import s from './styles.module.css';

export const SecondStep = () => {
    return (
        <div className={s.form}>
            <AuthSelect
                options={
                    ["HR", "Manager"]
                }
                placeholder="Position"
            />
            <AuthCalendarInput
                title="Date of birth"
            />
        </div>
    )
}

export default SecondStep;