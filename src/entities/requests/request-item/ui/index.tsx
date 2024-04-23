import s from './styles.module.css';
import HeadPart from '@/shared/ui/head-part';

interface IReq {
    id: number, 
    job_title: string,
    date_created: string
}

type RequestItemProps = {
    req: IReq,
    onClick: () => void,
    onDelete?: () => void,
    del?: boolean
}

export const RequestItem: React.FC<RequestItemProps> = ({ req, onClick, del, onDelete }) => {
    return (
        <div className={s.requestItem} onClick={onClick}>
            <HeadPart>
                <h2>{req.job_title}</h2>
                <div 
                    style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 10}}
                >
                    <span>{req.date_created}</span>
                    {
                        del && 
                        <img
                            onClick={onDelete}
                            style={{
                                width: 30
                            }} 
                            src='/images/trashIcon_black.png'
                        />
                    }
                </div>
            </HeadPart>
        </div>
    )
}