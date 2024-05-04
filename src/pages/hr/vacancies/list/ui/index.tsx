import s from './styles.module.css'

import { useTenantName } from "@/shared/hooks/useTenantName";
import { useEffect, useState } from "react";
import { WorkLayout } from "@/pages/layouts/work-layout";
import SearchInput from "@/shared/ui/search-input";

import $api from '@/shared/api/axios';
import { useNavigate } from 'react-router-dom';

export const VacancyListHRPage = () => {
    const [vacanciesList, setVacanciesList] = useState([]);
    const tenant = useTenantName();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVacancies = async () => {
            const response = await $api.get(`organisations/${tenant}/vacancies/`);
            console.log(response.data);
            setVacanciesList(response.data);
        };

        fetchVacancies();
    }, [tenant]);

    return (
        <WorkLayout>
            <div className={s.wrapper}>
                <h1>Vacancies</h1>
                <div className={s.dataFilter}>
                    <SearchInput />
                </div>
                <div className={s.tableContainer}>
                    {vacanciesList.length === 0 ? (
                        <p className={s.noVac}>No vacancy requests.</p>
                    ) : (
                        <table className={s.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Job Title</th>
                                    <th>Status</th>
                                    <th>Created on</th>
                                    <th>Owner</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vacanciesList.map((item, index) => (
                                    <tr 
                                        key={item.id}   
                                        onClick={() => navigate(`/organisations/${tenant}/vacancies/${item.id}`)}
                                    >
                                        <td>
                                            {index+1}
                                        </td>
                                        <td
                                            style={{width: 200}}
                                        >{item.job_title}</td>
                                        <td>
                                            <p style={{
                                                backgroundColor: item.open ? "#DCFFF1" : "#FFDCDC",
                                                color: item.open ? "green" : "red",
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                                textAlign: "center",
                                            }}>
                                                {item.open ? 'OPEN' : 'CLOSED'}
                                            </p>
                                        </td>
                                        <td
                                            style={{width: 150}}
                                        >{new Date(item.date_created).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td style={{width: 250}}>{item.owner.first_name} {item.owner.last_name}</td>
                                        <td
                                            style={{width: 200}}
                                        >

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </WorkLayout>
    );
};
