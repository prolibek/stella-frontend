import { Link } from "react-router-dom"
import s from './styles.module.css'
import { useTenantName } from "@/shared/hooks/useTenantName"

export const OrganisationSettingsSidebar = () => {
    const tenant = useTenantName();

    return (
        <div className={s.sidebar}>
            <div className={s.sidebarContent}>
                <Link
                    className={s.sidebarBtnContainer} 
                    to={`/organisations/${tenant}/forms`}
                >
                    <button
                        className={s.sidebarBtn}
                    >
                        ← Back
                    </button>
                </Link>
                <Link
                    className={s.sidebarBtnContainer} 
                    to={`/organisations/${tenant}/settings`}
                >
                    <button
                        className={s.sidebarBtn}
                    >
                        Information
                    </button>
                </Link>
                <Link
                    className={s.sidebarBtnContainer} 
                    to={`/organisations/${tenant}/settings`}
                >
                    <button
                        className={s.sidebarBtn}
                    >
                        Members
                    </button>
                </Link>
                
                <Link
                    className={s.sidebarBtnContainer} 
                    to={`/organisations/${tenant}/settings`}
                >
                    <button
                        className={s.sidebarBtn}
                    >
                        Hierarchy
                    </button>
                </Link>
            </div>
        </div>
    )
}