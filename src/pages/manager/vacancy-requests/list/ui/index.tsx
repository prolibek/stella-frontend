import { WorkLayout } from '@/pages/layouts/work-layout';
import { useEffect, useState } from 'react';
import s from './styles.module.css';
import BlueButton from '@/shared/ui/blue-button';
import Modal from '@/shared/ui/modal';
import { useTenantName } from '@/shared/hooks/useTenantName';
import $api from '@/shared/api/axios';
import 'react-quill/dist/quill.snow.css'; // for snow theme
import SearchInput from '@/shared/ui/search-input';
import { FormChooseModal } from '@/features/vacancy-request/choose';
import { CreateVacancyRequestModal } from '@/features/vacancy-request/create';


interface IForm {
    id: number,
    form_title: string
}

export const ManagerVacancyRequestsPage = () => {
    const [ requestsList, setRequestsList ] = useState([]);
    const [ step, setStep ] = useState(-1);
    const [ isFirstOpen, setIsFirstOpen ] = useState(false);
    const [ isSecondOpen, setIsSecondOpen ] = useState(false);
    const [ formId, setFormId ] = useState("0");
    const [ forms, setForms ] = useState<Array<IForm>>([]);
    const [ detReqId, setDetReqId ] = useState(-1);
    const [ detReq, setDetReq ] = useState({});

    const tenant = useTenantName();

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await $api.get(`organisations/${tenant}/vacancy-requests/${detReqId}/`)
            setDetReq(response.data)
        }

        if(detReqId !== -1)
            fetchRequest()
    }, [detReqId])

    useEffect(() => {
        const fetchForms = async () => {
            let response = await $api.get(`organisations/${tenant}/vacancy-forms/`);
            setForms(response.data)
        }

        const fetchRequests = async () => {
            let response = await $api.get(`organisations/${tenant}/vacancy-requests/my/`)
            setRequestsList(response.data)
            console.log(response.data)
        }

        fetchForms();
        fetchRequests();
    }, [isSecondOpen])

    return (
        <WorkLayout>
            <div className={s.wrapper}>
                <div className={s.headPart}>
                    <h1>Your vacancy requests</h1>
                    <div className={s.dataFilter}>
                        <SearchInput/>
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
                <div className={s.content}>
                    <div className={s.vrList}>
                        {
                            requestsList.length === 0 ?
                            <p className={s.noVac}>No vacancy requests.</p>
                            :
                            requestsList.map((item) => (
                                <div className={s.requestItem} onClick={() => setDetReqId(item.id)}>
                                    <div className={s.requestHead}>
                                        <h2>{item.job_title}</h2>
                                        <span>{item.date_created}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={s.detailWindow}>
                        <div className={s.detailContent}>
                            <div className={s.requestHead}>
                                <h2>{detReq.job_title}</h2>
                                <span>{detReq.date_created}</span>
                            </div>
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