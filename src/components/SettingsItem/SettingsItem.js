import './SettingsItem.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import DeleteSettingsModal from '../DeleteSettingsModal/DeleteSettingsModal';

export default function SettingsItem({ item, handleEdit }) {
    const navigate = useNavigate();

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

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/settings/${item.id}`)

        } catch (error) {
            console.error(error)
        } finally {
            closeModal()
        }

    }

    return (
        <>
            <section className="settings-item">
                <div className='settings-item__container'>
                    <div className='settings-item__left--even'>
                        <div className="settings-item__group">
                            <h4 className="settings-item__label">Settings ITEM</h4>
                        </div>
                        <div className="settings-item__group">
                            <h4 className="settings-item__label">CATEGORY</h4>
                            <p2 className="settings-item__category">{item.category}</p2>
                        </div>
                    </div>
                    <div className='settings-item__right'>
                        <div className="settings-item__group">
                            <h4 className="settings-item__label">STATUS</h4>
                            <p3 className='settings-item__status'>{item.status}</p3>
                        </div>
                    </div>
                    <div className='settings-item__right'>
                        <div className="settings-item__group">
                            <h4 className="settings-item__label">CONDITION</h4>
                            <p3 className='settings-item__status'>{item.condition}</p3>
                        </div>
                    </div>
                </div >
                <div className= 'settings-item__actions--even'>
                    <DeleteSettingsModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onConfirm={handleDeleteConfirm}
                        itemName={item.item_name}
                    />
                    <img className="settings-item__delete" src={deleteIcon} alt="delete settings item" onClick={openModal} />
                    <img className="settings-item__edit" src={editIcon} alt="edit settings item" onClick={handleEdit} />
                </div>
            </section >
        </>
    )
}