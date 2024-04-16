import './EditSettingsModal.scss'
import SettingsForm from '../SettingsForm/SettingsForm';
import xicon from '../../assets/icons/close-24px.svg'
import EditSettingForm from '../EditSettingForm/EditSettingForm';

export default function EditSettingModal({ isEditOpen, onClose, onConfirm, id }) {
    if (!isEditOpen) return null;

    return (
        <>
            <main>
                <section className='settings-modal'>
                    <div className="settings-modal__overlay">
                        <div className="settings-modal__content">
                            <section className='settings-modal__container'>
                                <section className='settings-modal__close-container'>
                                    <img className="settings-modal__close" onClick={onClose} src={xicon} />
                                </section>
                                {/* <section className='settings-modal__text-container'>
                                    <h1 className='settings-modal__heading'>Delete {itemName} settings item?</h1>
                                    <p>Please confirm that you’d like to delete {itemName} from the settings list. You won’t be able to undo this action.</p>
                                </section> */}
                                <section className="add-setting__form">
                                    <h1 className='add-setting__title'>Edit Setting</h1>
                                    <EditSettingForm type="edit" id={id} onClose={onClose} onConfirm={onConfirm} />
                                </section>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}