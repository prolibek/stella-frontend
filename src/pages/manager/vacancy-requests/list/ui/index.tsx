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
import { VacancyData } from '@/features/vacancy-request/data';


interface IForm {
    id: number,
    form_title: string
}

export const ManagerVacancyRequestsPage = () => {
    const [ requestsList, setRequestsList ] = useState([]);
    const [ isFirstOpen, setIsFirstOpen ] = useState(false);
    const [ isSecondOpen, setIsSecondOpen ] = useState(false);
    const [ formId, setFormId ] = useState("0");
    const [ forms, setForms ] = useState<Array<IForm>>([]);
    const [ detReqId, setDetReqId ] = useState(-1);
    const [ detReq, setDetReq ] = useState({});
    const [ forApp, setForApp ] = useState(false);
    const [ comments, setComments ] = useState("");
    const [ searchTerm, setSearchTerm ] = useState("");

    const tenant = useTenantName();

    const approveVacancyRequest = async (approve: boolean) => {
        await $api.post(`organisations/${tenant}/vacancy-requests/${detReqId}/approve/`, {
            status: approve ? 2 : 3,
            comments: comments
        })
    }

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

    useEffect(() => {
        setDetReqId(-1)
        setDetReq({})
    }, [forApp])

    const filteredRequests = useMemo(() => {
        return requestsList.filter(item => item.job_title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [requestsList, searchTerm]);

    useEffect(() => {
        const fetchForms = async () => {
            let response = await $api.get(`organisations/${tenant}/vacancy-forms/`);
            setForms(response.data)
        }

        const fetchRequests = async () => {
            if(!forApp) {
                const response = await $api.get(`organisations/${tenant}/vacancy-requests/my/`)
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
            } else {
                const response = await $api.get(`organisations/${tenant}/vacancy-requests/for_approval/`)
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
        }

        fetchForms();
        fetchRequests();
    }, [isSecondOpen, isFirstOpen, forApp])

    return (
        <WorkLayout>
            <div className={s.wrapper}>
                <div className={s.headPart}>
                    <h1>Your vacancy requests</h1>
                    <div className={s.dataFilter}>
                        <SearchInput
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <BlueButton
                            style={{
                                height: 35,
                                width: 35,
                                fontSize: 20
                            }} 
                            onClick={() => setIsFirstOpen(true)}
                        >
                            +
                        </BlueButton>
                    </div>
                </div>
                <div className={s.sections}>
                    <span 
                        className={`${s.sect} ${forApp ? '' : s.underline}`}
                        onClick={() => setForApp(false)}
                    >
                        Your requests   
                    </span>
                    <span 
                        className={`${s.sect} ${forApp ? s.underline : ''}`}
                        onClick={() => setForApp(true)}
                    >
                        For your approval   
                    </span>
                </div>
                <div className={s.content}>
                    <div className={s.vrList}>
                        {
                            filteredRequests.length === 0 ?
                            <p className={s.noVac}>No vacancy requests.</p>
                            :
                            filteredRequests.map((item) => (
                                <RequestItem 
                                    req={item} 
                                    del 
                                    onDelete={async () => {
                                        await $api.delete(`organisations/${tenant}/vacancy-requests/${item.id}/`)
                                        setRequestsList(requestsList.filter((req) => req.id != item.id))
                                    }}
                                    onClick={() => setDetReqId(item.id)}
                                />
                            ))
                        }
                    </div>
                    <div className={s.detailWindow}>
                        <div className={s.detailContent}>
                            <HeadPart>
                                <h2>{detReq.job_title}</h2>
                                <span>{detReq.date_created}</span>
                            </HeadPart>
                            <div className={s.detailInfo}>
                                <VacancyData vacancy={detReq}/>
                            </div>
                            {
                                detReq.public_data && forApp &&
                                <div className={s.btns}>
                                    <BlueButton
                                        onClick={() => approveVacancyRequest(true)}
                                    >
                                        Approve
                                    </BlueButton>
                                    <BlueButton 
                                        onClick={() => approveVacancyRequest(false)}
                                        style={{backgroundColor: "rgb(165, 58, 58)"}}
                                    >
                                        Deny
                                    </BlueButton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <FormChooseModal
                isOpen={isFirstOpen}
                onClose={() => setIsFirstOpen(false)}
                forms={forms}
                formId={formId}
                setFormId={setFormId}
                onNext={() => {
                    setIsFirstOpen(false)
                    setIsSecondOpen(true)
                }}
            />
            {
                isSecondOpen &&
                <CreateVacancyRequestModal
                    isOpen={isSecondOpen}
                    onClose={() => setIsSecondOpen(false)}
                    formId={formId}
                    onBack={() => {
                        setIsSecondOpen(false)
                        setIsFirstOpen(true)
                    }}
                />
            }
        </WorkLayout>
    )
}