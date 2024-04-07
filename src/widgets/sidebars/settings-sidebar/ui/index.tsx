import { useTenantName } from "@/shared/hooks/useTenantName"
import { WorkSidebarTemplate } from "../../work-template"
import { items } from "../lib/itemList"
import { SidebarButton } from "@/features/sidebar-button"

export const StructureSidebar = () => {
    const tenant = useTenantName();

    return ( 
        <WorkSidebarTemplate>
            { 
                items.map((item, index) => {
                    return <SidebarButton key={index} link={`/organisations/${tenant}${item.link}`}>{item.text}</SidebarButton>
                })
            }
        </WorkSidebarTemplate>
    )
}