import React, { useEffect, useRef, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setTimeout(() => setShow(true), 10); // Permite que se aplique la animación de apertura
        } else if (visible) {
            setShow(false);
            // Espera la animación de cierre antes de desmontar
            const timeout = setTimeout(() => setVisible(false), 300); // 300ms = duración animación CSS
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!visible) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-content modal-animate${show ? " show" : ""}`}
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};
export default Modal;