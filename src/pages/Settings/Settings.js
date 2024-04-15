import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingsList from '../../components/SettingsList/SettingsList';
import Header from '../../components/Header/Header';

import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import SearchModal from '../../components/SearchModal/SearchModal';
import AddSettingModal from '../../components/AddSettingModal.js/AddSettingModal';

const Settings = () => {
    const navigate = useNavigate();
    const [settingsList, setSettingsList] = useState([]);
    const [userCity, setUserCity] = useState("Miami-Dade County, Florida, US");
    const [userCoord, setUserCoord] = useState({ lat: '-80.1937', lon: '25.7743' });
    const userId = '2'; // Temp user_id

    const handleModalToggle = (shouldOpen) => {
        if (shouldOpen) {
            document.body.classList.add('no-scroll');
            openModal();
        } else {
            document.body.classList.remove('no-scroll')
            closeModal()
        }
    }

    const handleSettingsModalToggle = (shouldOpen) => {
        if (shouldOpen) {
            document.body.classList.add('no-scroll');
            openSettingsModal();
        } else {
            document.body.classList.remove('no-scroll')
            closeSettingsModal();
        }
    }

    const [isModalOpen, setModalOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const openSettingsModal = () => setSettingsModalOpen(true);
    const closeSettingsModal = () => setSettingsModalOpen(false);

    useEffect(() => {
        handleModalToggle(isModalOpen)
    }, [isModalOpen])

    useEffect(() => {
        handleSettingsModalToggle(isSettingsModalOpen)
    }, [isSettingsModalOpen])

    useEffect(() => {
        const getSettingsList = async () => {
            try {
                let response = await axios.get(`http://localhost:8080/api/settings/user/${userId}`);
                setSettingsList(response.data);
            } catch (error) {
                console.error("Error fetching settings list: \n", error);
            }
        }
        getSettingsList();
    }, [])

    const handleAddSetting = async (newSetting) => {
        try {
            // if (status === 'Out of Stock') {
            //     settingsItem.quantity = '0'
            // }
            const response = await axios.post('http://localhost:8080/api/settings', newSetting);
            const addedSetting = response.data; // Assuming the response contains the newly added setting
            setSettingsList(prevSettings => [addedSetting, ...prevSettings]); // Update settingsList with the newly added setting

        } catch (error) {
            console.error(error);

        }
        // onClose();
        // navigate('/settings');
        closeSettingsModal();
    }

    const handleSearchChange = (searchData) => {
        setUserCity(searchData.label);
        const [lat, lon] = searchData.value.split(" ");
        setUserCoord({ lat, lon });
    }

    return (
        <>
            <main>
                <Header />

                <section className="settings">
                    <div className="settings__container">
                        <section className="settings__header">
                            <h1 className="settings__title">Settings</h1>
                            <div className="settings__right">

                                <p className='dashboard__title'>
                                    CURRENT LOCATION: {userCity}
                                </p>
                                <div className="dashboard__actions">
                                    <SearchModal
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                        onConfirm={() => {
                                            sessionStorage.setItem('user_city', userCity);
                                            sessionStorage.setItem('user_lat', userCoord.lat);
                                            sessionStorage.setItem('user_lon', userCoord.lon);
                                            closeModal();
                                        }}
                                        onSearchChange={handleSearchChange} // Pass handleSearchChange as a prop
                                    />

                                    <img
                                        className="dashboard__location-update"
                                        src={deleteIcon}
                                        alt="update location icon"
                                        onClick={openModal} />
                                </div>

                                <div className="settings-item__actions">
                                    <AddSettingModal
                                        isSettingsOpen={isSettingsModalOpen}
                                        onClose={closeSettingsModal}
                                        onConfirm={handleAddSetting}
                                    // itemName={warehouse.warehouse_name}
                                    />
                                    {/* <img
                                        className="settings-item__delete"
                                        src={deleteIcon}
                                        alt="delete settings item"
                                    /> */}

                                    <button
                                        className="settings__button"
                                        onClick={openSettingsModal}>
                                        + Add New Item</button>
                                    {/* <button
                                        className="settings__button"
                                        onClick={handleAddItem}>
                                        + Add New Item</button> */}


                                </div>


                            </div>
                        </section>
                        <section className="settings__list">
                            {!settingsList ? (
                                <h2>Loading...</h2>
                            ) : (
                                <SettingsList settingsList={settingsList} />
                            )}
                        </section>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Settings;