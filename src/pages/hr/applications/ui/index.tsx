import { WorkLayout } from '@/pages/layouts/work-layout';
import { useEffect, useState, useMemo } from 'react';
import s from './styles.module.css';
import BlueButton from '@/shared/ui/blue-button';
import Modal from '@/shared/ui/modal';
import HeadPart from '@/shared/ui/head-part';
import { useTenantName } from '@/shared/hooks/useTenantName';
import $api from '@/shared/api/axios';
import 'react-quill/dist/quill.snow.css'; // for snow theme
import SearchInput from '@/shared/ui/search-input';
import { FormChooseModal } from '@/features/vacancy-request/choose';
import { CreateVacancyRequestModal } from '@/features/vacancy-request/create';
import { RequestItem } from '@/entities/requests/request-item/ui';
import AuthTextInput from '@/shared/ui/auth-input';
import { ListContent } from '@/widgets/list-content';


interface IForm {
    id: number,
    form_title: string
}

export const ApplicationHRPage = () => {
    const [ requestsList, setRequestsList ] = useState([]);
    const [ detReqId, setDetReqId ] = useState(-1);
    const [ detReq, setDetReq ] = useState({});
    const [ searchTerm, setSearchTerm ] = useState("");

    const tenant = useTenantName();

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await $api.get(`organisations/${tenant}/vacancy-requests/${detReqId}/`)
            setDetReq({
                ...response.data,
                date_created: new Date(response.data.date_created).toLocaleDateString("en-US", {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })
            })
        }

        if(detReqId !== -1)
            fetchRequest()
    }, [detReqId])

    const filteredRequests = useMemo(() => {
        return requestsList.filter(item => item.job_title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [requestsList, searchTerm]);

    useEffect(() => {

        const fetchRequests = async () => {
            const response = await $api.get(`organisations/${tenant}/vacancy-requests/fully_approved/`)
            setRequestsList(response.data.map((item) => (
                {
                    ...item,
                    date_created: new Date(item.date_created).toLocaleDateString("en-US", {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })
                }
            )))
        }

        fetchRequests();
    }, [])

    const createVacancy = async () => {
        try {
            await $api.post(`organisations/${tenant}/vacancies/`, {
                request: detReqId
            })
            setRequestsList(requestsList.filter((item) => item.id !== detReqId))
        } catch(error) {
            return ;
        }
    }
 
    return (
        <WorkLayout>
            <div className={s.wrapper}>
                <h1>Vacancy applications</h1>
                <div className={s.dataFilter}>
                    <SearchInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <ListContent 
                    list = {
                        filteredRequests.length === 0 ?
                        <p className={s.noVac}>No vacancy requests.</p>
                        :
                        filteredRequests.map((item) => (
                            <RequestItem req={item} onClick={() => setDetReqId(item.id)}/>
                        ))
                    }
                    content = {
                        <div className={s.detailContent}>
                            <HeadPart>
                                <h2>{detReq.job_title}</h2>
                                <span>{detReq.date_created}</span>
                            </HeadPart>
                            <div className={s.detailInfo}>
                                {
                                    detReq.public_data &&
                                    Object.entries(detReq.public_data).map(([key, value], index) => (
                                        <div className={s.dataItem} key={index}>    
                                            <h3>{key}:</h3>
                                            <span dangerouslySetInnerHTML={{__html: value}}></span>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                detReqId !== -1 && 
                                <div className={s.btns}>
                                    <BlueButton
                                        onClick={() => createVacancy()}
                                    >
                                        Create vacancy
                                    </BlueButton>
                                </div>
                            }
                        </div>
                    }
                />
            </div>
        </WorkLayout>
    )
}