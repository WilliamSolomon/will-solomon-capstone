import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import Header from '../../components/Header/Header';
import SearchModal from '../../components/SearchModal/SearchModal';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeatherBoard from '../../components/WeatherBoard/WeatherBoard';
import AlertBoard from '../../components/AlertBoard/AlertBoard';

import './Dashboard.scss';
import '../../styles/partials/_global.scss'
import authenticateUser from '../../utils/authenticateUser';
import searchIcon from '../../assets/icons/search-24px.svg';

function Dashboard() {
    //// JWT Authentication
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);

    useEffect(() => {
        const authorizeUser = async () => {
            try {
                const userData = await authenticateUser();
                setUser(userData);
            } catch (error) {
                setFailedAuth(true);
            }
        };
        authorizeUser();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
        setFailedAuth(true);
    };

    //// Dashboard Component 

    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecastWeather, setForecast] = useState(null)
 
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [userCity, setUserCity] = useState(decodedToken.city);
    const [userCoord, setUserCoord] = useState(decodedToken.coord);
    const userId = decodedToken.id;

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

        const currentWeatherFetch = fetch(`${currentWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);
        const forecastWeatherFetch = fetch(`${forecastWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);

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
                    <h2 className='dashboard__title'>
                        Good afternoon, Will!
                    </h2>
                    <div className="dashboard__actions">
                        {userCity}
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
                            src={searchIcon}
                            alt="update location icon"
                            onClick={openModal} />

                    </div>
                    <section className='dashboard__weather'>
                        <section className='dashboard__weather-current'>
                            {currentWeather && <CurrentWeather weatherData={currentWeather} />}
                        </section>
                        <section className='dashboard__weather-forecast'>
                            {currentWeather && <WeatherBoard weatherData={currentWeather} forecastData={forecastWeather} />}
                        </section>
                    </section>
                    <AlertBoard />
                </div>
            </main>
        </>

    );
}

export default Dashboard;
