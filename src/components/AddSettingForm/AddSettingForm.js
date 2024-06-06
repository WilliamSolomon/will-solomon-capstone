import './AddSettingForm.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";




const AddSettingForm = ({ type, id, onClose, onConfirm }) => {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const handleSubmit = (e) => {
        e.preventDefault();

        const specified_date = null;
        const user_id = userId
        const category = 'Weather';
        const status = "Active";
        const city = decodedToken.city
        const condition = e.target.settingsCondition.value;

        let isValid = true;

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
                user_id, category, condition, status, specified_date, city
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
                    <div className="settings-form__right">
                        <div className="settings-form__group">
                            <h3 htmlFor="condition" className="settings-form__label">Weather Condition</h3>
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
                    <button type='submit' className="settings-form__button--add">+ Add Item</button>
                </div>
            </form>
        </>
    )
}

export default AddSettingForm;