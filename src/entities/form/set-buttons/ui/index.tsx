import s from './styles.module.css'
import BlueButton from '@/shared/ui/blue-button'

type SetButtonsProps = {
    handleAdd: () => void,
    handleDelete: () => void
}

export const SetButtons: React.FC<SetButtonsProps> = ({handleAdd, handleDelete}) => {
    return (
        <div className={s.buttonContainer}>
            <BlueButton onClick={handleAdd} style={{
                height: 35,
                width: 35,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
                borderRadius: '50%',
                left: 0
            }}>
                +
            </BlueButton>
            <BlueButton onClick={handleDelete} style={{
                height: 35,
                width: 35,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
                borderRadius: '50%',
                left: 0
            }}>
                <img src="/images/trashIcon.png" />
            </BlueButton>
        </div>
    )
}