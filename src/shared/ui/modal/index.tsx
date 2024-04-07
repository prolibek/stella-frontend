import React, { useRef } from 'react';
import s from './styles.module.css';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    style?: any;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, style }) => {
    if (!isOpen) return null;

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <div className={s.overlay} onClick={onClose}>
            <div style={style} className={s.modal} onClick={handleModalClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
