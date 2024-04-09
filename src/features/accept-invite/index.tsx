import $api from "@/shared/api/axios";
import { useEffect } from "react";
import { useTenantName } from "@/shared/hooks/useTenantName";
import { useSearchParams, useNavigate } from "react-router-dom";

export const AcceptInvite = () => {
    const navigate = useNavigate();

    const tenant = useTenantName();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        try {
            const join = async () => {
                await $api.post(`organisations/${tenant}/invitation-accept/`, { token: searchParams.get('token').split('/')[0] })
            }

            join();

            navigate('/dashboard');
        } catch {
            navigate('/dashboard');
        }
    }, [])

    return (
        <></>
    )
}