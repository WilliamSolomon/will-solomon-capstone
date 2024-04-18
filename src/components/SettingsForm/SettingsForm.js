import './SettingsForm.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


const SettingsForm = ({ type, id, onClose, onConfirm }) => {
    const [settingsDetails, setSettingsDetails] = useState({ status: 'Active', });

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const handleStatusChange = (newStatus) => {
        setSettingsDetails({ ...settingsDetails, status: newStatus });
    };

    useEffect(() => {
        const getSettingsDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/settings/${id}`);
                setSettingsDetails(response.data);
                autofillFormFields(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        if (type === 'edit' && id) {
            getSettingsDetails();
        }
    }, [])

    const autofillFormFields = (settingsDetails) => {

        const form = document.querySelector('.settings-form');
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select, date');
            inputs.forEach((input) => {
                const fieldName = input.id;
                if (settingsDetails[fieldName]) {
                    input.value = settingsDetails[fieldName];
                }
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const specified_date = e.target.specifiedDate.value;
        const user_id = userId
        const category = e.target.settingCategory.value;
        const status = document.querySelector('input[name="settingStatus"]:checked').value;
        const condition = e.target.settingsCondition.value;

        if (category === 'weather') {
            specified_date = null;
        }

        let isValid = true;

        if (specified_date.trim() === '') {
            isValid = false;
            showErrorMessage(e.target.specifiedDate);
        } else {
            hideErrorMessage(e.target.specifiedDate);
        }

        if (category.trim() === '') {
            isValid = false;
            showErrorMessage(e.target.settingCategory);
        } else {
            hideErrorMessage(e.target.settingCategory);
        }

        if (condition.trim() === '') {
            isValid = false;
            showErrorMessage(e.target.settingsCondition);
        } else {
            hideErrorMessage(e.target.settingsCondition);
        }

        function showErrorMessage(inputElement) {
            const errorMessage = inputElement.nextElementSibling;
            errorMessage.style.display = 'block';
            inputElement.classList.add('invalid');
        }

        function hideErrorMessage(inputElement) {
            const errorMessage = inputElement.nextElementSibling;
            errorMessage.style.display = 'none';
            inputElement.classList.remove('invalid');
        }

        if (isValid) {
            const settingsItem = {
                user_id, category, condition, status, specified_date
            }

            const editsettings = async (settingsItem) => {
                try {
                    await axios.put(`http://localhost:8080/api/settings/${id}/edit`, settingsItem);
                } catch (error) {
                    console.error(error);
                }
                onClose();
            }

            e.target.reset();

            if (type === 'add') {
                onConfirm(settingsItem);
            } else if (type === 'edit') {
                editsettings(settingsItem);
            }


        } else {
            return;
        }
    }

    return (
        <>
            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="settings-form__container">
                    <div className="settings-form__left">
                        <h2 className="settings-form__subheading">Item Details</h2>
                        <div className="settings-form__group">
                            <h3 htmlFor="item_name" className="settings-form__label">Specified Date</h3>
                            <input type="date" id="item_name" name="specifiedDate" className="settings-form__input" />
                            <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                        </div>
                        <div className="settings-form__group">
                            <h3 htmlFor="category" className="settings-form__label">Category</h3>
                            <select id="category" name="settingCategory" className="settings-form__select-input" defaultValue="Weather">
                                <option value="">Please select</option>
                                <option value="Weather">Weather</option>
                                <option value="Date">Date</option>
                            </select>
                            <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                        </div>
                    </div>
                    <div className="settings-form__right">
                        <h2 className="settings-form__subheading">Setting Status</h2>
                        <div className="settings-form__group">
                            <h3 htmlFor="status" className="settings-form__label">Status</h3>
                            <div className="settings-form__radio-group">
                                <input className='settings-form__radio-input' id='statusActive' type="radio" name="settingStatus" value="Active" checked={settingsDetails.status === 'Active'} onChange={() => handleStatusChange('Active')} />
                                <label className="settings-form__radio-label" htmlFor='statusActive'>
                                    Active
                                </label>
                                <input className='settings-form__radio-input' id='statusDisabled' type="radio" name="settingStatus" value="Disabled" checked={settingsDetails.status === 'Disabled'} onChange={() => handleStatusChange('Disabled')} />
                                <label className="settings-form__radio-label" htmlFor='statusDisabled'>
                                    Disabled
                                </label>
                                <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                            </div>
                        </div>
                        <div className="settings-form__group">
                            <h3 htmlFor="condition" className="settings-form__label">Edit Setting</h3>
                            <select id="condition" name="settingsCondition" className="settings-form__select-input">
                                <option value="">Please select</option>
                                <option value="Clear">Clear</option>
                                <option value="Fog">Fog</option>
                                <option value="Rain">Rain</option>
                                <option value="Thunderstorm">Thunderstorm</option>
                                <option value="Drizzle">Drizzle</option>
                                <option value="Snow">Snow</option>
                                <option value="Mist">Mist</option>
                                <option value="Haze">Haze</option>
                                <option value="Tornado">Tornado</option>
                                <option value="clouds">Clouds</option>
                            </select>
                            <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                        </div>
                    </div>
                </div>
                <div className="settings-form__button-container">
                    <button className="settings-form__button settings-form__button--cancel" onClick={onClose}>Cancel</button>
                    {
                        type === 'add'
                            ?
                            <button type='submit' className="settings-form__button--add">+ Add Item</button>
                            :
                            <button type='submit' className="settings-form__button--edit">Save</button>
                    }
                </div>
            </form>
        </>
    )
}

export default SettingsForm;