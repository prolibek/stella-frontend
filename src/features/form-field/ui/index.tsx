import s from './styles.module.css'

type FormFieldProps = {
    setFocusedFieldIndex: () => void,
    updateFieldName: () => void,
    handleAddField: () => void,
    handleDeleteField: () => void,
    updateFieldType: () => void,
    index: any,
    field: any,
    children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
    setFocusedFieldIndex, 
    updateFieldName,
    handleAddField,
    handleDeleteField,
    updateFieldType,
    index,
    field,
    children
}) => {
    return (
        <div className={s.field} key={index} 
            onClick={setFocusedFieldIndex}
        >
            <div className={s.fieldUpperPart}>
                <input
                    className={s.question}
                    placeholder="Question name"
                    type="text"
                    value={field.name}
                    onChange={updateFieldName}
                    onFocus={setFocusedFieldIndex}
                />
                <select
                    className={s.fieldType}
                    value={field.type}
                    onChange={updateFieldType}
                    onFocus={setFocusedFieldIndex}
                >
                    {fieldTypes.map(fType => (
                        <option key={fType} value={fType}>
                            {fType}
                        </option>
                    ))}
                </select>
                {focusedFieldIndex === index && (
                    <SetButtons 
                        handleAdd={handleAddField}
                        handleDelete={handleDeleteField}
                    />
                )}
            </div>
            <div className={s.fieldLowerPart}>
                {
                    children
                }
            </div>
        </div>
    )
}