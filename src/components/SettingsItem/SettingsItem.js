import './SettingsItem.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import DeleteSettingsModal from '../DeleteSettingsModal/DeleteSettingsModal';
import EditSettingModal from '../EditSettingsModal.js/EditSettingsModal';

export default function SettingsItem({ item, updateTrigger }) {

    const handleModalToggle = (shouldOpen) => {
        if (shouldOpen) {
            document.body.classList.add('no-scroll');
            openModal();
        } else {
            document.body.classList.remove('no-scroll')
            closeModal()
        }
    }

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        handleModalToggle(isModalOpen)

    }, [isModalOpen])

    const handleEditModalToggle = (shouldEditOpen) => {
        if (shouldEditOpen) {
            document.body.classList.add('no-scroll');
            openEditModal();
        } else {
            document.body.classList.remove('no-scroll')
            closeEditModal()
        }
    }

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);

    useEffect(() => {
        handleEditModalToggle(isEditModalOpen)

    }, [isEditModalOpen])

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/settings/${item.id}`)

        } catch (error) {
            console.error(error)
        } finally {
            closeModal();
            updateTrigger();
        }

    }

    return (
        <>
            <section className="settings-item" key={item.id}>
                <div className='settings-item__container'>
                    <div className="settings-item__group">
                        <h4 className="settings-item__label">CATEGORY</h4>
                        <p2 className="settings-item__category">{item.category}</p2>
                    </div>
                    <div className="settings-item__group">
                        <h4 className="settings-item__label">STATUS</h4>
                        <p3 className='settings-item__status'>{item.status}</p3>
                    </div>
                    <div className="settings-item__group">
                        <h4 className="settings-item__label">CONDITION</h4>
                        <p3 className='settings-item__status'>{item.condition}</p3>
                    </div>
                </div >
                <div className='settings-item__actions-group'>
                    <DeleteSettingsModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onConfirm={handleDeleteConfirm}
                        itemName={item.item_name}
                    />
                    <img className="settings-item__delete" src={deleteIcon} alt="delete settings item" onClick={openModal} />
                    <EditSettingModal
                        isEditOpen={isEditModalOpen}
                        onClose={closeEditModal}
                        onEditClose={closeEditModal}
                        updateTrigger={updateTrigger}
                        id={item.id}
                    />
                    <img className="settings-item__edit" src={editIcon} alt="edit settings item" onClick={openEditModal} />
                </div>
            </section >
        </>
    )
}