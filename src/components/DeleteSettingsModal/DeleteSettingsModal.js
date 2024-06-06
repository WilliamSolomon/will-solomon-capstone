import xicon from '../../assets/icons/close-24px.svg'
import './DeleteSettingsModal.scss'


function DeleteSettingsModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <section className='settings-modal'>
            <div className="settings-modal__overlay">
                <div className="settings-modal__content">
                    <section className='settings-modal__container'>
                        <section className='settings-modal__close-container'>
                            <img className="settings-modal__close" onClick={onClose} src={xicon} />
                        </section>
                        <section className='settings-modal__text-container'>
                            <h1 className='settings-modal__heading'>Delete setting?</h1>
                        </section>
                    </section>
                    <section className="settings-modal__actions">
                        <button className="settings-modal__cancel" onClick={onClose}>Cancel</button>
                        <button className="settings-modal__delete" onClick={onConfirm}>Delete</button>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default DeleteSettingsModal