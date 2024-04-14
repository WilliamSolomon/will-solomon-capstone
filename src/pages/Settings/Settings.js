import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingsList from '../../components/SettingsList/SettingsList';
import Header from '../../components/Header/Header';

import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import SearchModal from '../../components/SearchModal/SearchModal';

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

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        handleModalToggle(isModalOpen)
    }, [isModalOpen])

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
    }, [settingsList])

    const handleAddItem = () => {
        navigate('/settings/add');
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

                                <button className="settings__button" onClick={handleAddItem}>+ Add New Item</button>
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