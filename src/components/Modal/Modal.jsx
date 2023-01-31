import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onCloseModal();
        }
    };

    render() {
        return (
            <div
                className={css.overlay}
                onClick={this.props.onCloseBackdropClick}
            >
                <div className={css.modal}>
                    <img src={this.props.largeImageURL} alt="" />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    onCloseBackdropClick: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
