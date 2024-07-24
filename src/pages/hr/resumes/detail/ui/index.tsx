import React, { useEffect, useState } from "react"

import s from "./styles.module.css"

import { WorkLayout } from "@/pages/layouts/work-layout"
import { useTenantName } from "@/shared/hooks/useTenantName"
import $api from "@/shared/api/axios"
import { useNavigate, useParams } from "react-router-dom"

export const ResumeDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    
    const [ resume, setResume ] = useState({});
    const [ interviews, setInterviews ] = useState([]);
    const [ selected, setSelected ] = useState(0);

    const [ intName, setIntName ] = useState("");
    const [ intDate, setIntDate ] = useState(null);
    const [ startTime, setStartTime ] = useState(null);
    const [ endTime, setEndTime ] = useState(null);

    const tenant = useTenantName();

    useEffect(() => {
        const fetchData = async () => {
            const response = await $api.get(`/organisations/${tenant}/resumes/${params.id}/`)
            setResume(response.data)
            console.log(response)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchInterviews = async () => {
            const response = await $api.get(`/organisations/${tenant}/resumes/${params.id}/interviews/`)
            setInterviews(response.data)
        }

        if(selected === 1)
            fetchInterviews();
    }, [selected])

    const elements = {
        1: (
            <div className={s.intWrapper}>
                <div style={{width: "100%"}}>
                    {

                    }
                </div>
                <div className={s.createInt}>
                    <div className={s.intName}>
                        <p>Stage name:</p>
                        <input 
                            className={s.inp}
                            value={intName}
                            onChange={(e) => {
                                setIntName(e.target.value)
                            }}
                        />
                    </div>
                    <div className={s.datetime}>
                        <div>
                            <p>Date:</p>
                            <input 
                                type="date" 
                                className={s.inp}
                                value={intDate}
                                onChange={(e) => {
                                    setIntDate(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <p>Time:</p>
                            <input 
                                type="time" 
                                className={s.inp}
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value)
                                }}
                            />
                            <span>—</span>
                            <input 
                                type="time" 
                                className={s.inp}
                                value={endTime}
                                onChange={(e) => {
                                    setEndTime(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            try {
                                const response = $api.post(`/organisations/${tenant}/resumes/${params.id}/interviews/`, {
                                    "name": intName,
                                    "date": intDate,
                                    "start_time": startTime,
                                    "end_time": endTime
                                })
                            } catch(error) {
                                console.log(error)
                            }
                            setInterviews([...interviews, {
                                "name": intName,
                                "date": intDate,
                                "start_time": startTime,
                                "end_time": endTime
                            }])
                        }} 
                        className={s.appointBtn}
                    >
                        + Create stage
                    </button>
                </div>
                <div className={s.intList}>
                    {
                        interviews.map((item, idx) => (
                            <div className={s.intDet}>
                                <h4>{item.name}</h4>
                                <div className={s.timeInfo}>
                                    <span>{item.date}</span>
                                    <span>{item.start_time} - {item.end_time}</span>
                                </div>
                                <textarea 
                                    value={item.notes}
                                    onChange={(e) => {
                                        const newInts = interviews.map((item, index) =>
                                            index === idx ? { ...item, notes: e.target.value } : item
                                        )
                                        setInterviews(newInts);
                                    }}
                                    className={s.notes}
                                />
                                <div className={s.intIcons}>
                                    <img 
                                        className={s.intIcon} width={20} 
                                        src="/images/trashIcon_black.png" 
                                    />
                                    <img
                                        onClick={async () => {
                                            await $api.patch(`/organisations/${tenant}/resumes/${params.id}/interviews/${item.id}/`, {
                                                "notes": item.notes
                                            })
                                        }} 
                                        className={s.intIcon} 
                                        width={20} 
                                        src="/images/checMarkIcon.png" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <WorkLayout>
            <h1><b className={s.back} onClick={() => navigate(-1)}>←</b> Resume "{resume.full_name}"</h1>
            <div className={s.mainWrapper}>
                <div className={s.left}>
                    <div className={s.info}>
                        <div className={s.infoHead}>
                            <h2>Description</h2>
                            <div className={s.photoWInfo}>
                                <img src={resume.photo} className={s.resumePhoto} />
                                <div className={s.details}>
                                    <p><strong>Full name: </strong>{resume.full_name}</p>
                                    <p><strong>Birth date: </strong>{resume.birth_date}</p>
                                    <p><strong>Email: </strong>{resume.email}</p>
                                    <p><strong>Phone: </strong>{resume.phone}</p>
                                </div>
                            </div>
                            <p>{resume.comments}</p>
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
                        >Stages</button>
                        <button
                            className={`${s.vacButton} ${selected == 2 && s.borderBottom}`}       
                            onClick={() => setSelected(2)}                     
                        >Characteristics</button>
                    </div>
                    { elements[selected] }
                </div>
            </div>
        </WorkLayout>
    )
}