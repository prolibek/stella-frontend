import { useEffect, useState } from 'react';
import { WorkLayout } from '@/pages/layouts/work-layout';
import s from './styles.module.css';
import BlueButton from '@/shared/ui/blue-button';
import { useNavigate } from 'react-router-dom';
import $api from '@/shared/api/axios';
import { useTenantName } from '@/shared/hooks/useTenantName';
import HeadPart from '@/shared/ui/head-part';

export const FormPage = () => {

    const navigate = useNavigate();
    const tenant = useTenantName();

    const [ forms, setForms ] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            let response = await $api.get(`/organisations/${tenant}/vacancy-forms/`);
            response = response.data;
            setForms(response);
        }

        fetchForms();
    }, [])

    return (
        <WorkLayout>
            <HeadPart>
                <h1>Organisation forms</h1>
                <BlueButton
                    onClick={() => {
                        navigate('create')
                    }}
                >
                    Create form
                </BlueButton>
            </HeadPart>
            <div className={s.content}>
                <div className={s.info}>
                    <h1>No forms yet.</h1>
                    <p>Create your own forms for vacancy requests. With this forms you can require managers to send you vacancy information.</p>
                </div>
            </div>
        </WorkLayout>
    )
}