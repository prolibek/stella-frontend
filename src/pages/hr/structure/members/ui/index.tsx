import { useState } from 'react';

import s from './styles.module.css'

import { StructureLayout } from "@/pages/layouts/work-layout";
import BlueButton from "@/shared/ui/blue-button";
import HeadPart from "@/shared/ui/head-part";
import { Table } from '@/entities/table';
import { useEffect } from 'react';
import $api from '@/shared/api/axios';
import { useTenantName } from '@/shared/hooks/useTenantName';
import { InviteModal } from '@/features/inivitation';
import { useNavigate } from 'react-router-dom';

export const Members = () => {
    const navigate = useNavigate();    
    const tenant = useTenantName();

    const [ members, setMembers ] = useState([]);  
    const [ emails, setEmails ] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInvite = async () => {
        if (emails.length === 0) {
            return;
        }
    
        try {
            const response = await $api.post(`/organisations/${tenant}/invitation-create/`, {
                emails
            });
            
            setEmails([]);
        } catch (error) {
        } finally {
            closeModal();
        }
    };
    
    useEffect(() => {
        const fetchMembers = async () => {
            let response = await $api.get(`/organisations/${tenant}/members/`);
            response = response.data;
            setMembers(response.map((item, index) => {
                const dateJoined = new Date(item.date_joined);
    
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(dateJoined);
    
                return { 
                    name: `${item.user.first_name} ${item.user.last_name}`, 
                    position: "None", 
                    role: item.user.role == 1 ? "HR" : "Manager", 
                    date_joined: formattedDate 
                }
            }));
        }

        fetchMembers();
    }, [])

    const columns = [
        { title: 'Name', dataIndex: 'name', width: '30%' },
        { title: 'Position', dataIndex: 'position', width: '25%' },
        { title: 'Role', dataIndex: 'role', width: '20%' },
        { title: 'Joined date', dataIndex: 'date_joined', width: '25%' },
    ];

    return (
        <StructureLayout>
            <HeadPart>
                <h1>
                    Members
                </h1>
                <BlueButton onClick={openModal}>Invite</BlueButton>
            </HeadPart>
            <div className={s.content}>
                <Table
                    columns={columns} data={members} 
                />
            </div>
            <InviteModal 
                emails={emails}
                setEmails={setEmails}
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onInvite={handleInvite} 
            />
        </StructureLayout>
    )
}