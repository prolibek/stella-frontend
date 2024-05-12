import { useState } from 'react'

import { WorkLayout } from '@/pages/layouts/work-layout'
import s from './styles.module.css'
import SearchInput from '@/shared/ui/search-input'
import BlueButton from '@/shared/ui/blue-button'
import HeadPart from '@/shared/ui/head-part'
import Modal from '@/shared/ui/modal'
import ReactQuill from 'react-quill'

export const ResumeListPage = () => {
    
    const [selectedView, setSelectedView ] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [resumeImage, setResumeImage] = useState(null);
    const [fileName, setFileName] = useState("No file was uploaded.")
    
    return (
        <WorkLayout>
            <h1>Resumes</h1>
            <HeadPart>
                <div className={s.dataFilter}>
                    <SearchInput />
                </div>
                <BlueButton
                    onClick={() => setIsOpen(true)}
                >
                    Upload resume
                </BlueButton>
            </HeadPart>
            <div className={s.viewType}>
                <ul>
                    <li 
                        onClick={() => setSelectedView(0)}
                        className={`${selectedView == 0 && s.underline}`}
                    >
                        List
                    </li>
                    <li
                        onClick={() => setSelectedView(1)} 
                        className={`${selectedView == 1 && s.underline}`}
                    >
                        Board
                    </li>
                    <li 
                        onClick={() => setSelectedView(2)}
                        className={`${selectedView == 2 && s.underline}`}
                    >
                        Calendar
                    </li>
                </ul>
            </div>
            <div>
                
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                style={{
                    maxHeight: "80vh",
                    overlayY: "auto"
                }}
            >
                <div>
                    <h1 style={{marginBottom: 20}}>Upload resume</h1>
                    <div className={s.fileLine}>
                        <div className={s.photoUploader}>
                            <form 
                                onClick={() => document.querySelector("#input-photo").click()}
                                action="" 
                                className={s.photoForm}
                            >
                                <input id="input-photo" type="file" accept='image/*' hidden
                                    onChange={({target: {files}}) => {
                                        files[0] && setFileName(files[0].name)
                                        if(files) {
                                            setResumeImage(URL.createObjectURL(files[0]))
                                        }
                                    }}
                                />
                                {
                                    resumeImage ?
                                    <img src={resumeImage} width={150} height={200}/>
                                    :
                                    <span style={{width:120}}>Drop an image here or upload it manually</span>
                                }
                            </form>
                        </div>
                        <div className={s.fileUploader}>
                            <form 
                                onClick={() => document.querySelector("#input-file").click()}
                                action="" 
                                className={s.fileForm}
                            >
                                <input id="input-file" type="file" hidden/>
                                <span>Upload files here and we will do everything for you</span>
                            </form>
                        </div>
                    </div>
                    <div className={s.resumeInfo}>
                        <div className={s.resumeLine}>
                            <input 
                                placeholder="Name" 
                                className={s.inp}
                                style={{width:"65%"}}
                            />
                            <input 
                                placeholder="Age" 
                                className={s.inp}
                                style={{width:"35%"}}
                            />
                        </div>
                        <div className={s.resumeLine}>
                            <input 
                                placeholder="Email" 
                                className={s.inp}
                                style={{width:"50%"}}
                            />
                            <input 
                                type="tel"
                                placeholder="Phone number" 
                                className={s.inp}
                                style={{width:"50%"}}
                            />
                        </div>
                    </div>
                    <ReactQuill style={{marginTop:40}}/>
                    <BlueButton>Save</BlueButton>
                </div>
            </Modal>
        </WorkLayout>
    )
}