import s from './styles.module.css'
import BlueButton from '@/shared/ui/blue-button';

export const renderElements = (field, handleAddOption, updateOption, deleteOption) => {
    switch (field.type) {
        case 'Short':
        case 'Long':
        case 'Date':
        case 'Number':
            return (
                <div className={s.bCont}>
                    <input
                        type={field.type === 'Long' ? 'text' : field.type.toLowerCase()}
                        placeholder={`${field.type} text answer`}
                        className={s.textInp}
                        disabled
                    />
                </div>
            );
        case 'Select':
        case 'Multiselect':
            return (
                <div className={s.bCont}>
                    {field.options.map((option, optionIndex) => (
                        <div key={optionIndex} className={s.selectCont}>
                            <div className={s.selectType}>
                                <div className={field.type === 'Select' ? s.round : s.roundSq}></div>
                                <input
                                    type="text"
                                    className={s.textInp}
                                    value={option}
                                    onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                                />
                            </div>
                            {
                                field.options.length > 1 &&
                                <button className={s.optDelete} onClick={() => deleteOption(field.id, optionIndex)}>
                                    ✖
                                </button>
                            }
                        </div>
                    ))}
                    <div className={s.selectType}>
                        <div className={field.type === 'Select' ? s.round : s.roundSq}></div>
                        <button className={s.addBtn} onClick={() => handleAddOption(field.id)}>
                            Add option
                        </button>   
                    </div>
                </div>
            );
        default:
            return <span>Unsupported type: {field.type}</span>;
    }
};