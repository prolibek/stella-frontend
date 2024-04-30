import { useState } from 'react';
import { WorkLayout } from '@/pages/layouts/work-layout';
import s from './styles.module.css';
import { renderElements } from  '../lib/renderElements';
import BlueButton from '@/shared/ui/blue-button';
import $api from '@/shared/api/axios';
import { useNavigate } from 'react-router-dom';
import { useTenantName } from '@/shared/hooks/useTenantName';
import HeadPart from '@/shared/ui/head-part';
import { SetButtons } from '@/entities/form/set-buttons';

export const CreateFormPage = () => {
    const fieldTypes = ['Short', 'Long', 'Select', 'Multiselect', 'Date', 'Number'];

    const [fields, setFields] = useState([
        { id: Date.now(), name: "", type: "Short", options: [] }
    ]);

    const [formName, setFormName] = useState("Form 1");

    const navigate = useNavigate();

    const handleAPIRequest = async () => {
        const requestData = {
            name: formName,
            fields: fields.map(field => ({
                field_name: field.name,
                options: field.options.join(';'),
                type: field.type
            }))
        };

        try {
            const tenant = useTenantName()

            const response = await $api.post(`organisations/${tenant}/vacancy-forms/`, requestData);
            
            navigate(`/organisations/${tenant}/forms`)
        } catch (error) {
            return ;
        }
    
    }

    const handleAddOption = (fieldId) => {
        setFields(fields.map(field => {
            if (field.id === fieldId && (field.type === 'Select' || field.type === 'Multiselect')) {
                return { ...field, options: [...field.options, `Option ${field.options.length + 1}`] };
            }
            return field;
        }));
    };
    
    const updateOption = (fieldId, optionIndex, newValue) => {
        setFields(fields.map(field => {
            if (field.id === fieldId) {
                const newOptions = [...field.options];
                newOptions[optionIndex] = newValue;
                return { ...field, options: newOptions };
            }
            return field;
        }));
    };

    const deleteOption = (fieldId, optionIndex) => {
        setFields(fields.map(field => {
            if (field.id === fieldId) {
                const filteredOptions = field.options.filter((_, index) => index !== optionIndex);
                return { ...field, options: filteredOptions };
            }
            return field;
        }));
    };

    const [focusedFieldIndex, setFocusedFieldIndex] = useState(0);

    const handleAddField = (index: number) => {
        const newField = { id: Date.now(), name: "", type: "Short", options: [] };
        const newFields = [...fields];
        newFields.splice(index + 1, 0, newField);
        setFields(newFields);
        setFocusedFieldIndex(index + 1);
    };

    const handleDeleteField = (index: number) => {
        if(fields.length === 1) 
            return 0;
        const newFields = fields.filter((_, fieldIndex) => fieldIndex !== index);
        setFields(newFields);
    
        if (focusedFieldIndex >= newFields.length) {
            setFocusedFieldIndex(newFields.length - 1);
        } else if (focusedFieldIndex === index) {
            setFocusedFieldIndex(index > 0 ? index - 1 : 0);
        }
    };

    const updateFieldName = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index].name = value;
        setFields(newFields);
    };

    const updateFieldType = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index].type = value;
        if(value == "Select" || value == "Multiselect")
            newFields[index].options = newFields[index].options.length === 0 ? [ "Option 1" ] : newFields[index].options
        else 
            newFields[index].options = []
        setFields(newFields);
    };

    return (
        <WorkLayout>
            <HeadPart>
                <h1>Create organisation form</h1>
                <BlueButton
                    onClick={handleAPIRequest}
                >
                    Save form
                </BlueButton>
            </HeadPart>
            <div className={s.content}>
                <div className={s.fieldList}>
                    <p className={s.infoPar}>*Job title (position) fields will be included automatically.</p>
                    <input 
                        type="text" 
                        placeholder="Enter the form name" 
                        className={s.formName}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                    {fields.map((field, index) => (
                        <div className={s.field} key={index} 
                            onClick={() => setFocusedFieldIndex(index)}
                        >
                            <div className={s.fieldUpperPart}>
                                <input
                                    className={s.question}
                                    placeholder="Question name"
                                    type="text"
                                    value={field.name}
                                    onChange={(e) => updateFieldName(index, e.target.value)}
                                    onFocus={() => setFocusedFieldIndex(index)}
                                />
                                <select
                                    className={s.fieldType}
                                    value={field.type}
                                    onChange={(e) => updateFieldType(index, e.target.value)}
                                    onFocus={() => setFocusedFieldIndex(index)}
                                >
                                    {fieldTypes.map(fType => (
                                        <option key={fType} value={fType}>
                                            {fType}
                                        </option>
                                    ))}
                                </select>
                                {focusedFieldIndex === index && (
                                    <SetButtons 
                                        handleAdd={() => handleAddField(index)}
                                        handleDelete={() => handleDeleteField(index)}
                                    />
                                )}
                            </div>
                            <div className={s.fieldLowerPart}>
                                {
                                    renderElements(field, handleAddOption, updateOption, deleteOption)
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </WorkLayout>
    );
};
