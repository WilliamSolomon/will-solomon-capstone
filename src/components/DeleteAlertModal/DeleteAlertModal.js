import React from 'react';
import axios from 'axios';

import xicon from '../../assets/icons/close-24px.svg'
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';

const DeleteAlertModal = ({ isOpen, onClose, alertId, updateTrigger }) => {

    if (!isOpen) return null;

    //  Change alert's status to 'Archived'
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/alerts/${alertId}`);
            updateTrigger();
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
        onClose();
        updateTrigger()
    };

    return (
        <section className='modal'>
            <div className="modal__overlay">
                <div className="modal__content">
                    <section className='modal__container'>
                        <section className='modal__close-container'>
                            <img className="modal__close" onClick={onClose} src={xicon} />
                        </section>
                        <section className='modal__text-container'>
                            <p>Delete alert?</p>
                        </section>
                    </section>
                    <section className="modal__actions">
                        <button className="modal__cancel" onClick={onClose}>Cancel</button>
                        <button className="modal__delete" onClick={handleDelete}>Delete</button>
                    </section>
                </div>
            </div>
        </section>

    )
}

export default DeleteAlertModal;
