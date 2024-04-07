import { useEffect, useRef, useState } from 'react'
import { StructureLayout } from '@/pages/layouts/work-layout'
import s from './styles.module.css'
import HeadPart from '@/shared/ui/head-part'
import $api from '@/shared/api/axios'
import { useTenantName } from '@/shared/hooks/useTenantName'
import AuthTextInput from '@/shared/ui/auth-input'
import AuthSelect from '@/shared/ui/auth-select'
import BlueButton from '@/shared/ui/blue-button'

export const OrganisationInformationPage = () => {
    const [orgInfo, setOrgInfo] = useState({ ceo: '', name: '', avatar: null });
    const [members, setMembers] = useState([]);
    const tenant = useTenantName();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchOrgInfo = async () => {
            const response = await $api.get(`organisations/${tenant}/information/`);
            const { ceo, name, avatar } = response.data;
            setOrgInfo({ ...orgInfo, ceo: ceo || '', name: name || '', avatar: avatar, avatarURL: avatar });
            console.log(response.data);
        };

        fetchOrgInfo();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await $api.get(`/organisations/${tenant}/members/`);
            const member = [
                { id: null, name: 'No CEO' }, // Default option representing 'null'
                ...response.data.map(member => ({
                    id: member.user.id, 
                    name: `${member.user.last_name} ${member.user.first_name}`
                }))
            ];
            setMembers(member);
        }    

        fetchMembers()
    }, [])

    const changeOrgData = async () => {
        const formData = new FormData();
        formData.append('name', orgInfo.name);
        formData.append('ceo', orgInfo.ceo);
    
        if (orgInfo.avatar) {
            formData.append('avatar', orgInfo.avatar);
        }
    
        try {
            const response = await $api.put(`organisations/${tenant}/information/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Update successful", response.data);
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <StructureLayout>
            <HeadPart>
                <h1>Information</h1>
            </HeadPart>
            <div className={s.mainContent}>
                <div 
                    className={s.imageUploader} 
                    onClick={handleClick} 
                    style={{ 
                        backgroundImage: `url(http://127.0.0.1:8000${orgInfo.avatarURL})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    }}
                >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{display: 'none'}} 
                            onChange={(e) => {
                                setOrgInfo({ ...orgInfo, avatar: e.target.files[0], avatarUrl: URL.createObjectURL(e.target.files[0]) });
                            }}
                        />
                        <img src='/images/cameraIcon.png' className={s.cameraIcon} />
                </div>
                <div className={s.inpNLabel}>
                    <span className={s.label}>Organisation name</span>
                    <AuthTextInput
                        type="text"
                        name="name"
                        value={orgInfo.name}
                        onChange={(e) => {
                            setOrgInfo({ ...orgInfo, name: e.target.value})
                        }}
                        style={{width: 200, height: 20}}
                        placeholder="Organization Name"
                    />
                </div>
                <div className={s.inpNLabel}>
                    <span className={s.label}>CEO</span>
                    <br/>
                    <span style={{color:"red", fontSize: 12}}>*CEO will have wide range of rights</span>
                    <AuthSelect
                        value={orgInfo.ceo ? orgInfo.ceo.toString() : ''}
                        onChange={(e) => setOrgInfo({...orgInfo, ceo: e.target.value ? Number(e.target.value) : null})}
                        options={members}
                    />
                </div>
                <BlueButton style={{width: 100, height: 50, fontSize: 16, marginTop: 10}} onClick={() => changeOrgData()}>
                    Save
                </BlueButton>
            </div>
        </StructureLayout>
    )
}