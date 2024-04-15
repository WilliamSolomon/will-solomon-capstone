import './EditSettingsModal.scss'
import SettingsForm from '../SettingsForm/SettingsForm';
import xicon from '../../assets/icons/close-24px.svg'

export default function EditSettingModal({ isEditOpen, onClose, onConfirm, id }) {
    if (!isEditOpen) return null;

    return (
        <>
            <main>
                <section className='inventory-modal'>
                    <div className="inventory-modal__overlay">
                        <div className="inventory-modal__content">
                            <section className='inventory-modal__container'>
                                <section className='inventory-modal__close-container'>
                                    <img className="inventory-modal__close" onClick={onClose} src={xicon} />
                                </section>
                                {/* <section className='inventory-modal__text-container'>
                                    <h1 className='inventory-modal__heading'>Delete {itemName} inventory item?</h1>
                                    <p>Please confirm that you’d like to delete {itemName} from the inventory list. You won’t be able to undo this action.</p>
                                </section> */}
                                <section className="add-setting__form">
                                    <h1 className='add-setting__title'>Edit Setting</h1>
                                    <SettingsForm type="edit" id={id} onClose={onClose} onConfirm={onConfirm} />
                                </section>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}