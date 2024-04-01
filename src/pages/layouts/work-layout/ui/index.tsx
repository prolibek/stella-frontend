import React from 'react';
import { Sidebar } from '@/widgets/sidebars/work-sidebar';
import { WorkHeader } from '@/widgets/work-header';
import s from './styles.module.css';
import { StructureSidebar } from '@/widgets/sidebars/settings-sidebar';

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

export const StructureLayout: React.FC <LayoutProps> = ({ children }) => {
    return (
        <div className={s.wrapper}>
            <WorkHeader />
            <div className={s.mainWrapper}>
                <StructureSidebar />
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}