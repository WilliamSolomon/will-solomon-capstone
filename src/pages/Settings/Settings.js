import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SettingsList from '../../components/SettingsList/SettingsList';
import Header from '../../components/Header/Header';

const Settings = () => {
    const navigate = useNavigate();
    const [settingsList, setSettingsList] = useState([]);
    const userId = '2'; // Temp user_id

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

    return (
        <>
            <main>
                <Header />
                <section className="settings">
                    <div className="settings__container">
                        <section className="settings__header">
                            <h1 className="settings__title">Settings</h1>
                            <div className="settings__right">
                                <input className="settings__search" type="text" placeholder="Search..." />
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