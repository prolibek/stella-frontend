import s from './styles.module.css';
import ReactQuill from 'react-quill';

export const BasicForm = () => {
    return (
        <>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Reason of vacancy creation</span>
                <input type="text" placeholder='Short answer text' className={s.formInput}></input>
            </div>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Salary</span>
                <input type="text" placeholder='Short answer text' className={s.formInput}></input>
            </div>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Experience (years)</span>
                <input type="number" placeholder='Number' className={s.formInput}></input>
            </div>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Education</span>
                <input type="text" placeholder='Short answer text' className={s.formInput}></input>
            </div>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Responsibilities</span>
                <ReactQuill theme='snow'/>
            </div>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Requirements</span>
                <ReactQuill className={s.longText} theme='snow'/>
            </div>
            <div className={s.inputBlock}>
                <span className={s.formLabel}>Additional information</span>
                <ReactQuill className={s.longText} theme='snow'/>
            </div>
        </>
    )
}