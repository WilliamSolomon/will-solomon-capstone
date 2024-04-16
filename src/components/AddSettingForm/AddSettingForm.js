import './AddSettingForm.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const AddSettingForm = ({ type, id, onClose, onConfirm }) => {
    const navigate = useNavigate();
    const [settingsDetails, setSettingsDetails] = useState({ status: 'Active', });
    const [showQuantityField, setShowQuantityField] = useState(false);
    const [quantity, setQuantity] = useState('0');
    const userId = '2'; // Temp user_id

    const handleStatusChange = (newStatus) => {
        // setSettingsDetails({ ...settingsDetails, status: newStatus, quantity: 1 });
        setSettingsDetails({ ...settingsDetails, status: newStatus });
        // setShowQuantityField(newStatus === 'In Stock');
    };

    // useEffect(() => {
    //     const getSettingsDetails = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/api/settings/${id}`);
    //             setSettingsDetails(response.data);
    //             autofillFormFields(response.data);
    //             console.log('Settings Details', response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     if (type === 'edit' && id) {
    //         getSettingsDetails();
    //     }
    // }, [])

    // useEffect(() => {
    //     setShowQuantityField(settingsDetails.status === 'In Stock');
    //     setSettingsDetails(prevDetails => ({
    //         ...prevDetails,
    //         quantity: prevDetails.quantity || 0
    //     }));
    // }, [settingsDetails.status]);

    // const autofillFormFields = (settingsDetails) => {

    //     const form = document.querySelector('.settings-form');
    //     if (form) {
    //         console.log("Form present");
    //         const inputs = form.querySelectorAll('input, textarea, select, date');
    //         inputs.forEach((input) => {
    //             const fieldName = input.id;
    //             if (settingsDetails[fieldName]) {
    //                 input.value = settingsDetails[fieldName];
    //             }

    //         });
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const specified_date = null;
        const user_id = userId
        const category = 'Weather';
        const status = "Active";
        // let quantity = e.target.itemQuantity?.value;
        const condition = e.target.settingsCondition.value;

        // if (category === 'weather') {
        //     specified_date = null;
        // }

        let isValid = true;

        // if (specified_date.trim() === '') {
        //     isValid = false;
        //     showErrorMessage(e.target.specifiedDate);
        // } else {
        //     hideErrorMessage(e.target.specifiedDate);
        // }

        // if (condition.trim() === '') {
        //     isValid = false;
        //     showErrorMessage(e.target.settingCondition);
        // } else {
        //     hideErrorMessage(e.target.settingCondition);
        // }

        // if (category.trim() === '') {
        //     isValid = false;
        //     showErrorMessage(e.target.settingCategory);
        // } else {
        //     hideErrorMessage(e.target.settingCategory);
        // }

        // if (status === 'In Stock') {
        //     if (quantity.trim() === '') {
        //         isValid = false;
        //         showErrorMessage(e.target.itemQuantity);
        //     } else {
        //         hideErrorMessage(e.target.itemQuantity);
        //     }
        // } else {
        //     setQuantity('0');
        // }

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

            // const addsettings = async (settingsItem) => {
            //     try {
            //         // if (status === 'Out of Stock') {
            //         //     settingsItem.quantity = '0'
            //         // }
            //         await axios.post('http://localhost:8080/api/settings', settingsItem);
            //     } catch (error) {
            //         console.error(error);

            //     }
            //     onClose();
            //     // navigate('/settings');
            // }

            const editsettings = async (settingsItem) => {
                try {
                    // if (status === 'Out of Stock') {
                    //     settingsItem.quantity = '0'

                    // }
                    await axios.put(`http://localhost:8080/api/settings/${id}/edit`, settingsItem);
                } catch (error) {
                    console.error(error);
                }
                onClose();
                // navigate('/settings');

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
                    {/* <div className="settings-form__left"> */}
                        {/* <h2 className="settings-form__subheading">Add Setting</h2> */}

                        {/* <div className="settings-form__group">
                            <h3 htmlFor="item_name" className="settings-form__label">Specified Date</h3>
                            <input type="date" id="item_name" name="specifiedDate" className="settings-form__input" />
                            <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                        </div> */}

                        {/* <div className="settings-form__group">
                            <h3 htmlFor="condition" className="settings-form__label">condition</h3>
                            <textarea type="text" id="condition" name="settingCondition" className="settings-form__input-textarea" placeholder='Please enter a brief condition...' />
                            <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                        </div> */}
                        {/* 
                        <div className="settings-form__group">
                            <h3 htmlFor="category" className="settings-form__label">Category</h3>
                            <select id="category" name="settingCategory" className="settings-form__select-input" defaultValue="Weather">
                                <option value="">Please select</option>
                                <option value="Weather">Weather</option>
                                <option value="Date">Date</option>
                            </select>
                            <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                        </div> */}

                    {/* </div> */}
                    <div className="settings-form__right">
                        {/* <h2 className="settings-form__subheading">Setting Status</h2>
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
                        </div> */}
                        {/* {showQuantityField && (
                            <div className="settings-form__group">
                                <h3 htmlFor="quantity" className="settings-form__label">Quantity</h3>
                                <input type="text" id="quantity" name="itemQuantity" className="settings-form__input" placeholder='1' />
                                <div className="error-message icon" style={{ display: 'none' }}>This field is required</div>
                            </div>
                        )} */}
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
                {/* <section className="inventory-modal__actions">
                    <button className="inventory-modal__cancel" onClick={onClose}>Cancel</button>
                    <button className="inventory-modal__delete" onClick={onConfirm}>Delete</button>
                </section> */}
            </form>
        </>
    )
}

export default AddSettingForm;