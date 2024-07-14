import React from "react"

import s from './styles.module.css'
import { useNavigate } from "react-router-dom"

interface headerObj {
    name: string,
    key: string,
    style: any
}

interface BasicTableProps {
    headers: Array<headerObj>,
    data: any,
    link?: string
}

export const BasicTable:React.FC<BasicTableProps> = ({headers, data, link}) => {
    const navigate = useNavigate();

    return (
        <table className={s.table}>
            <thead>
                <tr>
                    {
                        headers.map((item, index) => (
                            <th key={index} style={item.style}>{item.name}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {data.map((row: any) => (
                    <tr
                        onClick={() => navigate(`${link}${row.id}`)}
                    >
                        {
                            headers.map((item, index) => (
                                <td style={item.style} key={index}>{row[item.key]}</td>
                            ))
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}