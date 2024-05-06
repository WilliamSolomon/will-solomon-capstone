import './SearchModal.scss'
import xicon from '../../assets/icons/close-24px.svg'
import SearchBar from '../SearchBar/SearchBar';

function SearchModal({ isOpen, onClose, onConfirm, onSearchChange }) {
    if (!isOpen) return null;

    const handleSearchChange = (searchData) => {
        onSearchChange(searchData);
    }

    return (
        <section className='modal'>
            <div className="modal__overlay">
                <div className="delete-modal__content">
                    <section className='modal__container'>
                        <section className='modal__close-container'>
                            <img className="modal__close" onClick={onClose} src={xicon} />
                        </section>
                    </section>
                    <SearchBar onSearchChange={handleSearchChange} />
                    <section className="modal__actions">
                        <button className="modal__cancel" onClick={onClose}>Cancel</button>
                        <button className="modal__update" onClick={() => onConfirm()}>Update</button>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default SearchModal;
