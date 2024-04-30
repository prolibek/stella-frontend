import { useParams } from 'react-router-dom'
import s from './styles.module.css'

import { WorkLayout } from "@/pages/layouts/work-layout"
import { useEffect, useState } from 'react'
import $api from '@/shared/api/axios'
import { useTenantName } from '@/shared/hooks/useTenantName'

export const VacancyDetailPage = () => {
    const params = useParams()
    const tenant = useTenantName()

    const [ vacancy, setVacancy ] = useState("")

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
            <h1><b>←</b> Vacancy "{vacancy.job_title}"</h1>
            <div>
                <div>
                    <div>
                    </div>
                    <div>
                    </div> 
                </div>
                <div>
                    
                </div>
            </div>
        </WorkLayout>
    )
}