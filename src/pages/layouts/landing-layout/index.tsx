import React from "react";

import { Header } from "@/widgets/header";
import s from './styles.module.css';

interface LayoutProps {
    children?: React.ReactNode;
};

const LandingLayout:React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={s.wrapper}>
            <Header/>
            <div className={s.content}>
                {children}
            </div>
        </div>
    )
}

export default LandingLayout;