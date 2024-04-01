import { useState } from 'react';
import AuthTextInput from '@/shared/ui/auth-input';
import s from './styles.module.css';
import { AuthButton } from '@/shared/ui/auth-button';
import { useNavigate } from 'react-router-dom';
import $api from '@/shared/api/axios';

export const CreateOrganisationPage = () => {
    const navigate = useNavigate();

    const [ orgName, setOrgName ] = useState("");
    const [ key, setKey ] = useState("");

    const [ errors, setErrors ] = useState({
        orgName: '',
        key: ''
    })

    const handleButtonClick = async () => {
        let err = {orgName: '', key: ''}
        if(!orgName.trim())
            err.orgName = "This field must not be empty.";
        if(!key.trim()) 
            err.key = "This field must not be empty.";
        setErrors(err);
        if(err.orgName || err.key) {
            return;
        }

        try {
            await $api.post('/public/organisations/', {
                name: orgName ? orgName : null,
                slug: key ? key : null
            });
        } catch {
            setErrors({...errors, key: 'Tenant already exists'})
            return ;
        }

        navigate('/dashboard');
    }    

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.info}>
                    <h1>Create an organisation</h1>
                    <p>Enter the name of your organisation and the key. Putting the key to URL will lead you right to the page of your organisation.</p>
                </div>
                <div className={s.inp}>
                    <AuthTextInput 
                        value={orgName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setOrgName(e.target.value)
                        }}
                        text="Organisation name"
                    />
                    <p className={s.error}>{errors.orgName}</p>
                </div>
                <div className={s.inp}>
                    <AuthTextInput
                        value={key}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setKey(e.target.value)
                        }}
                        text="Key"
                    />
                    <p className={s.error}>{errors.key}</p>
                </div>
                <hr />
                <div className={s.buttonContainer}>
                    <button
                        onClick={()=>{
                            navigate('/dashboard')
                        }} 
                        className={s.backBtn}
                    >
                        Back
                    </button>
                    <AuthButton 
                        onClick={handleButtonClick}
                        text="Create"
                    />
                </div>
            </div>
        </div>
    )
}