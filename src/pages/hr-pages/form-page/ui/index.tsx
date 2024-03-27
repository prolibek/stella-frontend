import { useState } from 'react';
import { WorkLayout } from '@/pages/layouts/work-layout';
import s from './styles.module.css';
import BlueButton from '@/shared/ui/blue-button';
import { useNavigate } from 'react-router-dom';

export const FormPage = () => {

    const navigate = useNavigate();

    return (
        <WorkLayout>
            <div className={s.wrapper}>
                <div className={s.headPart}>
                    <h1>Organisation forms</h1>
                    <BlueButton
                        onClick={() => {
                            navigate('create')
                        }}
                    >
                        Create form
                    </BlueButton>
                </div>
                <div className={s.content}>
                    <div className={s.info}>
                        <h1>No forms yet.</h1>
                        <p>Create your own forms for vacancy requests. With this forms you can require managers to send you vacancy information.</p>
                    </div>
                </div>
            </div>
        </WorkLayout>
    )
}