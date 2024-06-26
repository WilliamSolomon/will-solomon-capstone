import './Settings.scss';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingsList from '../../components/SettingsList/SettingsList';
import Header from '../../components/Header/Header';
import { jwtDecode } from 'jwt-decode'


import searchIcon from '../../assets/icons/search-24px.svg';
import SearchModal from '../../components/SearchModal/SearchModal';
import AddSettingModal from '../../components/AddSettingModal.js/AddSettingModal';
import { Link } from 'react-router-dom';

const Settings = () => {
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [token, setToken] = useState(null)

    const [settingsList, setSettingsList] = useState([]);
    const [triggerRefresh, setTriggerRefresh] = useState(false);

    // const token = localStorage.getItem('token');

    const [userCity, setUserCity] = useState(null);
    const [userCoord, setUserCoord] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

    const updateTrigger = () => {
        setTriggerRefresh(!triggerRefresh)
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const openSettingsModal = () => setSettingsModalOpen(true);
    const closeSettingsModal = () => setSettingsModalOpen(false);

    useEffect(() => {
        // getItem from sessionStorage token
        const storageToken = localStorage.getItem('token');
        setToken(storageToken);

        // If theres not a token then setFailedAuth to true and return 
        if (!storageToken) {
            setFailedAuth(true)
        }
        // Otherwise we will check to see if the current user is authorized to be on this dashboard

        const authorizeUser = async () => {
            try {
                // Make a get request to "http://localhost:8080/api/users/current"
                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: {
                        Authorization: `Bearer ${storageToken}`
                    }
                })
                setUser(response.data)
            } catch (error) {
                console.log(error);
                setFailedAuth(true)
            }
        }
        authorizeUser()
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setFailedAuth(true);
    };

    useEffect(() => {
        const handleModalToggle = (shouldOpen) => {
            if (shouldOpen) {
                document.body.classList.add('no-scroll');
                openModal();
            } else {
                document.body.classList.remove('no-scroll')
                closeModal()
            }
        }
        handleModalToggle(isModalOpen);
    }, [isModalOpen]);

    useEffect(() => {
        const handleSettingsModalToggle = (shouldOpen) => {
            if (shouldOpen) {
                document.body.classList.add('no-scroll');
                openSettingsModal();
            } else {
                document.body.classList.remove('no-scroll')
                closeSettingsModal();
            }
        }
        handleSettingsModalToggle(isSettingsModalOpen);
    }, [isSettingsModalOpen]);

    useEffect(() => {

        if (!token) {
            return; // Exit early if token is null
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const getSettingsList = async () => {
            try {
                let response = await axios.get(`http://localhost:8080/api/settings/user/${userId}`);
                setSettingsList(response.data);
            } catch (error) {
                console.error("Error fetching settings list: \n", error);
            }
        }
        getSettingsList();
    }, [token, triggerRefresh])

    if (failedAuth) {
        return (
            <main className="settings__logout">
                <h3>You must be logged in to see this page.</h3>
                <p>
                    <Link to="/login">Log in</Link>
                </p>
            </main>
        );
    }

    if (user === null) {
        return (
            <main className="dashboard">
                <p>User Null Loading...</p>
            </main>
        );
    }

    const handleAddSetting = async (newSetting) => {
        try {
            const response = await axios.post('http://localhost:8080/api/settings', newSetting);
            const addedSetting = response.data; // Assuming the response contains the newly added setting
            setSettingsList(prevSettings => [addedSetting, ...prevSettings]); // Update settingsList with the newly added setting
        } catch (error) {
            console.error(error);

        }
        closeSettingsModal();
        updateTrigger();
    }

    const handleSearchChange = (searchData) => {
        setUserCity(searchData.label);
        const [lat, lon] = searchData.value.split(" ");
        setUserCoord({ lat, lon });
    }

    console.log(userCity);
    console.log(userCoord);

    return (
        <>
            <main>
                <section className="settings">
                    <div className="settings__container">
                        <section className="settings__header">
                            <h2 className="settings__title">Settings</h2>
                            <button className="dashboard__logout" onClick={handleLogout}>
                                Log out
                            </button>
                        </section>
                        <section className="settings__list">
                            <div className="settings__actions">
                                <div className="settings-item__actions">
                                    <AddSettingModal
                                        isSettingsOpen={isSettingsModalOpen}
                                        onClose={closeSettingsModal}
                                        onConfirm={handleAddSetting}
                                    />
                                    <button
                                        className="settings__button"
                                        onClick={openSettingsModal}>
                                        Add Alert</button>
                                </div>
                            </div>
                            {!settingsList ? (
                                <h2>Loading...</h2>
                            ) : (
                                <SettingsList updateTrigger={updateTrigger} settingsList={settingsList} />
                            )}
                        </section>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Settings;