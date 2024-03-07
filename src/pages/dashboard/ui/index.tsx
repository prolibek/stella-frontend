import StellaLogo from '@/shared/ui/stella-logo';
import s from './styles.module.css';

export const Dashboard = () => {
    return (
        <>
            <div className={s.header}>
                <div className={s.headerContainer}>
                    <div className={s.logo}>
                        <StellaLogo/>
                    </div>
                    <div className={s.profile}>

                    </div>
                </div>
            </div>
        </>
    )
}