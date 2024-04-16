import './AddSettingModal.scss'
import SettingsForm from '../SettingsForm/SettingsForm';
import xicon from '../../assets/icons/close-24px.svg'
import AddSettingForm from '../AddSettingForm/AddSettingForm';

export default function AddSettingModal({ isSettingsOpen, onClose, onConfirm }) {
    if (!isSettingsOpen) return null;

    return (
        <>
            <main>
                <section className='add-setting__modal'>
                    <div className="add-setting__modal__overlay">
                        <div className="add-setting__modal__content">
                            <section className='add-setting__modal__container'>
                                <section className='add-setting__modal__close-container'>
                                    <img className="add-setting__modal__close" onClick={onClose} src={xicon} />
                                </section>
                                {/* <section className='add-setting__modal__text-container'>
                                    <h1 className='add-setting__modal__heading'>Delete {itemName} inventory item?</h1>
                                    <p>Please confirm that you’d like to delete {itemName} from the inventory list. You won’t be able to undo this action.</p>
                                </section> */}
                                <section className="add-setting__form">
                                    <h1 className='add-setting__title'>Add New Alert Setting</h1>
                                    <AddSettingForm type="add" onClose={onClose} onConfirm={onConfirm} />
                                </section>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}