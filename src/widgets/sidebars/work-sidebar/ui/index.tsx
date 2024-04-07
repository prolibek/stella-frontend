import { useSelector } from 'react-redux';
import s from './styles.module.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTenantName } from '@/shared/hooks/useTenantName';
import { WorkSidebarTemplate } from '../../work-template';
import { SidebarButton } from '@/features/sidebar-button';

import { managerItems, HRItems } from '../lib/itemList';

export const Sidebar = () => {
    const user = useSelector(state => state.auth.user);

    const tenant = useTenantName();

    return (
        <WorkSidebarTemplate>
                {
                    user.role === 1 ?
                    <>
                        { 
                            HRItems.map((item, index) => {
                                return <SidebarButton key={index} link={`/organisations/${tenant}${item.link}`}>{item.text}</SidebarButton>
                            })
                        }
                    </>
                    :
                    <>
                        {
                            managerItems.map((item, index) => {
                                return <SidebarButton key={index} link={`/organisations/${tenant}${item.link}`}>{item.text}</SidebarButton>
                            })
                        }
                    </>
                }
        </WorkSidebarTemplate>
    )
}