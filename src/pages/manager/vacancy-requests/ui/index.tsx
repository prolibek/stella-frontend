import { WorkLayout } from '@/pages/layouts/work-layout';
import { useState } from 'react';
import s from './styles.module.css';
import BlueButton from '@/shared/ui/blue-button';

export const ManagerVacancyRequestsPage = () => {
    const [ requestsList, setRequestsList ] = useState([]);

    return (
        <WorkLayout>
            <div className={s.wrapper}>
                <div className={s.headPart}>
                    <h1>Your vacancy requests</h1>
                    <div className={s.dataFilter}>
                        <div className={s.searchContainer}>
                            <input type="text" placeholder="Search" className={s.searchBar}/>
                            <img src="/images/searchIcon.png" className={s.searchIcon} />
                        </div>
                        <BlueButton
                            style={{
                                height: 35,
                                width: 35,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20
                            }} 
                        >
                            +
                        </BlueButton>
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.vrList}>
                        {
                            requestsList.length === 0 ?
                            <p className={s.noVac}>No vacancy requests.</p>
                            :
                            <></>
                        }
                    </div>
                    <div className={s.detailWindow}>

                    </div>
                </div>
            </div>
        </WorkLayout>
    )
}