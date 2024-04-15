import { weatherAPI_Key, weatherAPI_URL } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Header from '../../components/Header/Header';
import SearchModal from '../../components/SearchModal/SearchModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import WeatherBoard from '../../components/WeatherBoard/WeatherBoard';
import AlertBoard from '../../components/AlertBoard/AlertBoard';


import './Dashboard.scss';
import '../../styles/partials/_global.scss'
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';


function Dashboard() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecastWeather, setForecast] = useState(null)
    const [userCity, setUserCity] = useState("Miami-Dade County, Florida, US");
    const [userCoord, setUserCoord] = useState({ lat: '-80.1937', lon: '25.7743' });

    const navigate = useNavigate();

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

    const loadWeather = () => {
        const { lat, lon } = userCoord;

        const currentWeatherFetch = fetch(`${weatherAPI_URL}/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI_Key}&units=imperial`);
        const forecastWeatherFetch = fetch(`${weatherAPI_URL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPI_Key}&units=imperial`);

        Promise.all([currentWeatherFetch, forecastWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: userCity, ...weatherResponse });
                setForecast({ city: userCity, ...forecastResponse });
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        loadWeather();
    }, []);

    console.log("Current Weather", currentWeather)
    console.log("Forecast", forecastWeather)

    const handleSearchChange = (searchData) => {
        setUserCity(searchData.label);
        const [lat, lon] = searchData.value.split(" ");
        setUserCoord({ lat, lon });
    }

    return (
        <>
            <Header />
            <main>
                <div className="dashboard">
                    <p className='dashboard__title'>
                        DASHBOARD TITLE: {userCity}
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
                                loadWeather();
                            }}
                            onSearchChange={handleSearchChange} // Pass handleSearchChange as a prop
                        />
                        <img
                            className="dashboard__location-update"
                            src={deleteIcon}
                            alt="update location icon"
                            onClick={openModal} />

                    </div>
                
                    {currentWeather && <CurrentWeather weatherData={currentWeather} />}
               
                    {currentWeather && <WeatherBoard weatherData={currentWeather} forecastData={forecastWeather} />}
                    <AlertBoard />
                </div>
            </main>
        </>

    );
}

export default Dashboard;
