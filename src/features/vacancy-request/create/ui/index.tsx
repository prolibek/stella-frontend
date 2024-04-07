import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import s from './styles.module.css'
import Modal from '@/shared/ui/modal'
import BlueButton from '@/shared/ui/blue-button'
import { BasicForm } from '@/widgets/basic-form'
import $api from '@/shared/api/axios'
import { useTenantName } from '@/shared/hooks/useTenantName'
import { renderElements } from '../renderElements'
import { InputBlock } from '@/entities/form/input-block'

type CreateVacancyRequestProps = {
    formId: string,
    isOpen: boolean,
    onClose: () => void,
    onBack: () => void
}

export const CreateVacancyRequestModal:React.FC<CreateVacancyRequestProps> = ({
    formId, isOpen, onClose, onBack
}) => {

    const FieldType = {
        1: 'Short',
        2: 'Long',
        3: 'Select',
        4: 'Multiselect',
        5: 'Date',
        6: 'Number',
        7: 'List'
    };
    
    const tenant = useTenantName();

    const [ fields, setFields ] = useState([]);
    const [ formData, setFormData ] = useState({});
    const [ formName, setFormName ] = useState("");
    const [ jobTitle, setJobTitle ] = useState("");

    const changeJobTitle = (_, job_title) => {
        setJobTitle(job_title)
    }

    const updateFormData = (fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const publishVacancyRequest = async () => {
        $api.post(`organisations/${tenant}/vacancy-requests/`, {
            job_title: jobTitle,
            public_data: formData
        });
        onClose();
    }

    useEffect(() => {
        const fetchForm = async () => {
            if(formId === '0') return;
            let response = await $api.get(`organisations/${tenant}/vacancy-forms/${formId}/`)
            response = response.data 
            setFormName(response.form_title)
            setFields(response.fields)
        }

        fetchForm()
    }, [])

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                style={{
                    width: "700px"
                }}
            >
                <h2
                    style={{
                        fontWeight: 550,
                        fontSize: 20,
                        marginBottom: 20
                    }}
                >{ formName }</h2>
                <div className={s.inputList}>
                {renderElements("Vacancy name", "Short", [], changeJobTitle)}
                {
                    formId == '0' ?
                    <>
                        <BasicForm/>
                    </>
                    :
                    fields.map((field) => (
                        renderElements(field.field_name, FieldType[field.field_type], field.options, updateFormData)
                    ))
                }
                </div>
                <div className={s.btns}>
                    <button 
                        className={s.cancelButton}
                        onClick={onBack}
                    >
                        Back
                    </button>
                    <BlueButton 
                        onClick={() => publishVacancyRequest()}
                    >Next</BlueButton>
                </div>
            </Modal>
        </>
    )
}