import { useState } from 'react'

import { WorkLayout } from '@/pages/layouts/work-layout'
import s from './styles.module.css'
import SearchInput from '@/shared/ui/search-input'
import BlueButton from '@/shared/ui/blue-button'
import HeadPart from '@/shared/ui/head-part'
import Modal from '@/shared/ui/modal'
import ReactQuill from 'react-quill'

import mammoth from 'mammoth'

import axios from 'axios'
import $api from '@/shared/api/axios'
import { useTenantName } from '@/shared/hooks/useTenantName'

export const ResumeListPage = () => {
    const tenant = useTenantName();

    const getFileType = (file) => {
        const fileName = file.name;
        const extension = fileName.split('.').pop().toLowerCase();
    
        switch (extension) {
            case 'pdf':
            case 'docx':
                return extension;
            default:
                console.error('Unsupported file type');
                return null;
        }
    };

    const extractTextFromPDF = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
        let textContent = '';
    
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContentItems = await page.getTextContent();
            textContentItems.items.forEach(item => {
                textContent += item.str + ' ';
            });
        }
    
        return textContent;
    };
    
    const extractTextFromDOCX = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    };
    
    const extractTextFromFile = async (file) => {
        const fileType = getFileType(file);
        let text = '';
    
        switch (fileType) {
            case 'pdf':
                text = await extractTextFromPDF(file);
                break;
            case 'docx':
                text = await extractTextFromDOCX(file);
                break;
            default:
                console.error('Unsupported file type');
        }
    
        return text;
    };
    

    const getFileIcon = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return '/images/pdfIcon.png';
            case 'doc':
            case 'docx':
                return '/images/docIcon.png';
            case 'xls':
            case 'xlsx':
                return '/images/excelIcon.png';
            default:
                return '/images/fileIcon.png';
        }
    };

    const truncateFilename = (filename, maxLength = 15) => {
        return filename.length > maxLength ? `${filename.substring(0, maxLength)}...` : filename;
    };

    const sendDataToServer = async (formData) => {
        try {
            const response = await $api.post(`organisations/${tenant}/resumes/`, formData);
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };    

    const handleSubmit = async () => {
        const formData = new FormData();
    
        files.forEach((file, index) => {
            formData.append('files', file);
        });
    
        formData.append('image', resumeImage);
        formData.append('text', text);
        formData.append('full_name', fullName);
        formData.append('birth_date', birthDate);
        formData.append('email', email);
        formData.append('phonenumber', phoneNumber);
    
        await sendDataToServer(formData);
    };

    const [selectedView, setSelectedView ] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [resumeImage, setResumeImage] = useState(null);
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("No file was uploaded.");

    const [text, setText] = useState("");
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
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
                    <label>
                    <input 
                        type="file" 
                        onChange={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newFile = e.target.files[0];
                            if (newFile) {
                                setFiles([...files, newFile]);
                                e.target.value = null;
                                if(files.length === 0) {
                                    const text = await extractTextFromFile(newFile)
                                    console.log(text)
                                    setText(text)
                                }
                            }
                        }}
                        hidden
                    />
                    <span className={s.fileUploadButton}>Add files</span>
                    </label>
                    <div className={s.fileLine}>
                        <div className={s.photoUploader}>
                            <form   
                                onClick={(e) => {
                                    e.stopPropagation()
                                    document.querySelector("#input-photo").click();
                                }}
                                action="" 
                                className={s.photoForm}
                            >
                                <input id="input-photo" type="file" accept='image/*' hidden
                                    onChange={({target: {files}}) => {
                                        e.stopPropagation()
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
                            {
                                files.length === 0 ? (
                                    <span>Uploaded files will be displayed here. The first file you send will be parsed</span>
                                ) : 
                                (
                                    files.map((file, index) => (
                                        <div key={index} className={s.fileItem}>
                                            <img style={{width:"75px"}} src={getFileIcon(file.name)} alt="" />
                                            <div style={{display: "flex", gap: "5px"}}>
                                                <span>{truncateFilename(file.name, 15)}</span>
                                                <button 
                                                    className={s.delButton}
                                                    style={{outline: "none", background: "none", border: "none"}}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newFiles = files.filter((_, i) => i !== index);
                                                        setFiles(newFiles);
                                                    }
                                                }>
                                                    ✖
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className={s.resumeInfo}>
                        <div className={s.resumeLine}>
                            <input 
                                placeholder="Name" 
                                className={s.inp}
                                style={{width:"65%"}}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input 
                                placeholder="Age" 
                                type="date"
                                className={s.inp}
                                style={{width:"35%"}}
                                value={birthDate}
                                onChange={(e) => {
                                    setBirthDate(e.target.value)
                                    console.log(birthDate)
                                }}
                            />
                        </div>
                        <div className={s.resumeLine}>
                            <input 
                                placeholder="Email" 
                                className={s.inp}
                                style={{width:"50%"}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="tel"
                                placeholder="Phone number" 
                                className={s.inp}
                                style={{width:"50%"}}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <ReactQuill style={{marginTop:40}} value={text} onChange={setText}/>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <BlueButton 
                            onClick={() => {
                                handleSubmit()
                                setIsOpen(false)
                            }}
                            style={{marginTop: 20, width: 150}}
                        >
                            Save
                        </BlueButton>
                    </div>
                </div>
            </Modal>
        </WorkLayout>
    )
}