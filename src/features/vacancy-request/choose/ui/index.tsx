import { SetStateAction, Dispatch } from 'react';
import s from './styles.module.css';
import Modal from '@/shared/ui/modal';
import BlueButton from '@/shared/ui/blue-button';

type FormChooseModalProps = {
    isOpen: boolean,
    onClose: () => void,
    formId: string,
    setFormId: Dispatch<SetStateAction<string>>,
    forms: any,
    onNext: () => void
}

export const FormChooseModal:React.FC<FormChooseModalProps> = ({isOpen, onClose, forms, formId, setFormId, onNext}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            style={{
                width: "400px"
            }}
        >
            <div className={s.modalContent}>
                <h2>Choose an application form</h2>
                <select 
                    className={s.formSelect} 
                    value={formId}
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                        setFormId(e.target.value)
                    }}
                >
                    <option key={0}>Basic form</option>
                    {
                        forms.map((form) => (
                            <option key={form.id} value={form.id}>{form.form_title}</option>
                        ))
                    }
                </select>
                <div className={s.btns}>
                    <button 
                        className={s.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <BlueButton 
                        onClick={onNext}
                    >Next</BlueButton>
                </div>
            </div>
        </Modal>
    )
}