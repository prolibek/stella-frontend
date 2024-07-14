import { useEffect, useState } from 'react'

import { WorkLayout } from '@/pages/layouts/work-layout'
import s from './styles.module.css'
import SearchInput from '@/shared/ui/search-input'
import BlueButton from '@/shared/ui/blue-button'
import HeadPart from '@/shared/ui/head-part'
import Modal from '@/shared/ui/modal'

import axios from 'axios'
import $api from '@/shared/api/axios'
import { useTenantName } from '@/shared/hooks/useTenantName'
import { BasicTable } from '@/widgets/tables/basic-table'
import { ResumeForm } from '@/features/resume/create'

export const ResumeListPage = () => {
    const tenant = useTenantName();

    const sendDataToServer = async (formData) => {
        try {
            const response = await $api.post(`organisations/${tenant}/resumes/`, formData);
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };    

    useEffect(() => {
        const fetchResumes = async () => {
            const response = await $api.get(`organisations/${tenant}/resumes/`)
            setResumes(response.data)
            console.log(response.data)
        }

        fetchResumes();
    }, [])

    const [resumes, setResumes] = useState([]);

    const [selectedView, setSelectedView ] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <WorkLayout>
            <h1>Resumes</h1>
            <HeadPart>
                <div className={s.dataFilter}>
                    <SearchInput />
                </div>
                <BlueButton
                    onClick={() => setIsOpen(true)}
                >
                    Upload resume
                </BlueButton>
            </HeadPart>
            <div className={s.viewType}>
                <ul>
                    <li 
                        onClick={() => setSelectedView(0)}
                        className={`${selectedView == 0 && s.underline}`}
                    >
                        List
                    </li>
                    <li
                        onClick={() => setSelectedView(1)} 
                        className={`${selectedView == 1 && s.underline}`}
                    >
                        Board
                    </li>
                    <li 
                        onClick={() => setSelectedView(2)}
                        className={`${selectedView == 2 && s.underline}`}
                    >
                        Calendar
                    </li>
                </ul>
            </div>
            <div>
                <BasicTable
                    headers={[
                            {    
                                name: "Full name",
                                key: "full_name",
                                style: {minWidth: 250}
                            },
                            {    
                                name: "Birth date",
                                key: "birth_date",
                                style: {minWidth: 120}
                            },
                            {    
                                name: "Email",
                                key: "email",
                                style: {minWidth: 200}
                            },
                            {    
                                name: "Phone number",
                                key: "phone",
                                style: {minWidth: 200}
                            },
                            {    
                                name: "Date created",
                                key: "date_created",
                                style: {minWidth: 200}
                            },
                    ]}
                    data={resumes}
                    link={`/organisations/${tenant}/resumes/`}
                />
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                style={{
                    maxHeight: "80vh",
                    overlayY: "auto"
                }}
            >
                <ResumeForm
                    onSave={sendDataToServer}
                />
            </Modal>
        </WorkLayout>
    )
}