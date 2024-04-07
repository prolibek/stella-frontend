import ReactQuill from 'react-quill';
import s from './styles.module.css'
import { InputBlock } from '@/entities/form/input-block';
import 'react-quill/dist/quill.snow.css';

export const renderElements = (field_name, field_type, options, onChange) => {

    switch (field_type) {
        case 'Short':
            return (
                <InputBlock title={field_name}>
                    <input 
                        className={s.formInput} 
                        type="text" 
                        placeholder='Short answer text'
                        onChange={(e) => onChange(field_name, e.target.value)}
                    />
                </InputBlock>
            );
        case 'Date':
            return (
                <InputBlock title={field_name}>
                    <input 
                        className={s.formInput} 
                        type="date"
                        onChange={(e) => onChange(field_name, e.target.value)}
                    />
                </InputBlock>
            );
        case 'Number':
            return (
                <InputBlock title={field_name}>
                    <input 
                        className={s.formInput} 
                        type="number" 
                        placeholder='Number'
                        onChange={(e) => onChange(field_name, e.target.value)}
                    />
                </InputBlock>
            );
        case 'Select':
            return (
                <InputBlock title={field_name}>
                    <select 
                        className={s.formInput}
                        onChange={(e) => onChange(field_name, e.target.value)}
                    > 
                        {options.map((option, index) => (
                            <option value={option.option}>{option.option}</option>
                        ))}
                    </select>
                    { /*
                    <fieldset className={s.fieldset}>
                        {options.map((option, index) => (
                                <div>
                                    <input className={s.radioInp} type="radio" value={option.option} name={option.option}/>
                                    <label for={option.option}>{option.option}</label>
                                </div>
                        ))}
                    </fieldset>
                    */ }
                </InputBlock>
            );
        case 'Multiselect':
            return (
                <InputBlock title={field_name}>
                    <fieldset className={s.fieldset}>
                        {options.map((option, index) => (
                            <div key={index}>
                                <input 
                                    className={s.radioInp} 
                                    type="checkbox" 
                                    value={option.option} 
                                    name={option.option}
                                    onChange={(e) => onChange(field_name, { option: option.option, checked: e.target.checked })} 
                                />
                                <label htmlFor={option.option}>{option.option}</label>
                            </div>
                        ))}
                    </fieldset>
                </InputBlock>
            );
        case 'Long':
            return (
                <InputBlock title={field_name}>
                    <ReactQuill 
                        theme="snow"
                        className={s.quill}
                        onChange={(content, delta, source, editor) => onChange(field_name, content)} 
                    />
                </InputBlock>
            )
        default:
            return <span>Unsupported type: {type}</span>;
    } 
};