import React, { useState } from 'react';
import s from './styles.module.css';
import BlueButton from '@/shared/ui/blue-button';

export const InviteModal = ({ isOpen, onClose, onInvite, emails, setEmails }) => {
    const [inputValue, setInputValue] = useState('');

    const handleOverlayClick = (e) => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue) {
            // Prevent form submission if used within a form
            e.preventDefault();
            if (!emails.includes(inputValue)) { // Prevent adding duplicates
                setEmails([...emails, inputValue]);
                setInputValue('');
            }
        }
    };

    const removeEmail = (emailToRemove) => {
        setEmails(emails.filter(email => email !== emailToRemove));
    };

    const sendInvitations = () => {
        emails.forEach(email => onInvite(email));
        setEmails([]); // Clear the emails after sending the invitations
    };

    if (!isOpen) return null;

    return (
        <div className={s.modalOverlay} onClick={handleOverlayClick}>
            <div className={s.modalContent} onClick={handleContentClick}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <h2 className={s.headText}>Invite member to the organisation</h2>
                    <button onClick={onClose} className={s.closeBtn}>✖</button>
                </div>
                <div className={s.emailTags}>
                    {emails.map(email => (
                        <span key={email} className={s.emailTag}>
                            {email}
                            <button onClick={() => removeEmail(email)} className={s.removeTagBtn}>✖</button>
                        </span>
                    ))}
                    <input
                        type="email"
                        placeholder="Enter email"
                        className={s.inp}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
                <div className={s.btn}>
                    {
                        emails.length <= 1 ? 
                        <BlueButton style={{width: "100%"}} onClick={sendInvitations}>
                            Send
                        </BlueButton> :
                        <BlueButton style={{width: "100%"}} onClick={sendInvitations}>
                            Send to {emails.length} users
                        </BlueButton>
                    }
                </div>
            </div>
        </div>
    );
};