import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';
import { WorkHeader } from '@/widgets/work-header';
import { useEffect } from 'react';
import $api from '@/shared/api/axios';
import { OrganisationCard } from '@/features/organisations';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        (async () => {
            let response = await $api.get("/public/users/me/organisations/");
            setOrganisationList(response.data);
        })();
    }, [])

    const [ organisationList, setOrganisationList ] = useState([]);

    return (
        <div className={s.wrapper}>
            <WorkHeader />
            <div className={s.mainWrapper}>
                <div className={s.content}>
                    <div className={s.orgHeader}>
                        <h1>Organisations</h1>
                        <button onClick={() => {
                            navigate('/create-organisation')
                        }}>
                            Create organisation
                        </button>
                    </div>
                    <hr/>
                    <div className={s.orgList}>
                        {
                            organisationList.map((org) => (
                                <div 
                                    key={org.id}
                                    onClick={() => {
                                        user.role === 2 ?
                                        navigate(`/organisations/${org.organisation.slug}/vacancy-requests`) 
                                        :
                                        navigate(`/organisations/${org.organisation.slug}/forms`)
                                    }}
                                >
                                    <OrganisationCard
                                        org={org.organisation}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}