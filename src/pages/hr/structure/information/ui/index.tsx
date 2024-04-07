import { useRef, useState } from 'react'
import { StructureLayout } from '@/pages/layouts/work-layout'
import s from './styles.module.css'
import HeadPart from '@/shared/ui/head-part'

export const OrganisationInformationPage = () => {
    const [ orgInfo, setOrgInfo ] = useState({});
    

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <StructureLayout>
            <HeadPart>
                <h1>Information</h1>
            </HeadPart>
            <div className={s.mainContent}>
                <div className={s.imageUploader} onClick={handleClick}>
                        <input type="file" ref={fileInputRef} style={{display: 'none'}} />
                        <img src='/images/cameraIcon.png' className={s.cameraIcon} />
                </div>
            </div>
        </StructureLayout>
    )
}