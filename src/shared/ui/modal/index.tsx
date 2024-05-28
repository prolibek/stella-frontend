import React, { useRef, useEffect } from 'react';
import s from './styles.module.css';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    style?: any;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, style }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={s.overlay}>
            <div ref={modalRef} style={style} className={s.modal}>
                {children}
            </div>
        </div>
    );
};

export default Modal;