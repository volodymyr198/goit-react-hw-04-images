import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const Modal = ({ largeImageURL, onCloseModal, onCloseBackdropClick }) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onCloseModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCloseModal]);

    return (
        <div className={css.overlay} onClick={onCloseBackdropClick}>
            <div className={css.modal}>
                <img src={largeImageURL} alt="" />
            </div>
        </div>
    );
};

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    onCloseBackdropClick: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
