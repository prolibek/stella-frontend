import React from 'react';
import { Sidebar } from '@/widgets/work-sidebar';
import { WorkHeader } from '@/widgets/work-header';
import s from './styles.module.css';

interface LayoutProps {
    children?: React.ReactNode;
};

export const WorkLayout: React.FC <LayoutProps> = ({ children }) => {
    return (
        <div className={s.wrapper}>
            <WorkHeader />
            <div className={s.mainWrapper}>
                <Sidebar />
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}