import StellaLogo from '@/shared/ui/stella-logo';
import s from './styles.module.css';
import { useSelector } from 'react-redux';
import { WorkHeader } from '@/widgets/work-header';

export const Dashboard = () => {
    return (
        <div className={s.wrapper}>
            <WorkHeader />
        </div>
    )
}