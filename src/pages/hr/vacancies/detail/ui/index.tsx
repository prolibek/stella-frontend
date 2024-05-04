import { useNavigate, useParams } from 'react-router-dom'
import s from './styles.module.css'

import { WorkLayout } from "@/pages/layouts/work-layout"
import { useEffect, useState } from 'react'
import $api from '@/shared/api/axios'
import { useTenantName } from '@/shared/hooks/useTenantName'
import AuthTextInput from '@/shared/ui/auth-input'
import { VacancyData } from '@/features/vacancy-request/data'

export const VacancyDetailPage = () => {
    const params = useParams()
    const tenant = useTenantName()
    const navigate = useNavigate()

    const [ vacancy, setVacancy ] = useState("")
    const [ selected, setSelected ] = useState(0);

    useEffect(() => {
        const fetchVacancy = async() => {
            const response = await $api.get(`organisations/${tenant}/vacancies/${params.id}/`)
            console.log(response.data)
            setVacancy(response.data)
        }
        
        fetchVacancy()
    }, [])

    return (
        <WorkLayout>
            <h1><b className={s.back} onClick={() => navigate(-1)}>←</b> Vacancy "{vacancy.job_title}"</h1>
            <div className={s.mainWrapper}>
                <div className={s.left}>
                    <div className={s.info}>
                        <div className={s.infoHead}>
                            <h2>Description</h2>
                        </div>
                        <VacancyData vacancy={vacancy}/>
                    </div>
                    <div className={s.comments}>
                        <h2>Comments</h2>
                        <div className={s.commentsInput}>
                            <input type="text" placeholder="Add comment"/>
                            <img src="/images/sendIcon.png"/>
                        </div>
                        <div className={s.commentsList}>

                        </div>
                    </div> 
                </div>
                <div className={s.rightWrapper}>
                    <div className={s.vacancyMenu}>
                        <button
                            className={`${s.vacButton} ${selected == 0 && s.borderBottom}`}
                            onClick={() => setSelected(0)}
                        >History</button>
                        <button
                            className={`${s.vacButton} ${selected == 1 && s.borderBottom}`}
                            onClick={() => setSelected(1)}
                        >Resumes</button>
                        <button
                            className={`${s.vacButton} ${selected == 2 && s.borderBottom}`}       
                            onClick={() => setSelected(2)}                     
                        >Statistics</button>
                    </div>
                </div>
            </div>
        </WorkLayout>
    )
}