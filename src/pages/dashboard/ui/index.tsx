import StellaLogo from '@/shared/ui/stella-logo';
import s from './styles.module.css';
import { useSelector } from 'react-redux';
import { WorkHeader } from '@/widgets/work-header';
import { Sidebar } from '../../../widgets/work-sidebar';

export const Dashboard = () => {
    return (
        <div className={s.wrapper}>
            <WorkHeader />
            <div className={s.mainWrapper}>
                <div className={s.content}>

                </div>
            </div>
        </div>
    )
}