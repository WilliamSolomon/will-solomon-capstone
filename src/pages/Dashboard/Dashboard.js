import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



import Header from '../../components/Header/Header';
import SearchModal from '../../components/SearchModal/SearchModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import WeatherBoard from '../../components/WeatherBoard/WeatherBoard';
import AlertBoard from '../../components/AlertBoard/AlertBoard';


import './Dashboard.scss';
import '../../styles/partials/_global.scss'
import authenticateUser from '../../utils/authenticateUser';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';

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
    const [userCity, setUserCity] = useState("Miami-Dade County, Florida, US");
    // // const [userCity, setUserCity] = useState("Brooklyn, NY, US");
    const [userCoord, setUserCoord] = useState({ lat: '25.7743', lon: '-80.1937' });
    // const [userCoord, setUserCoord] = useState({ lat: '40.6782', lon: '73.9442' });
   
    
    // const token = localStorage.getItem('token');
    // const decodedToken = jwt_decode(token);
    // const userId = decodedToken.id;

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    // const [userCity, setUserCity] = useState(decodedToken.coord);
    // const [userCoord, setUserCoord] = useState({ lat: decodedToken.coord.lat, lon: decodedToken.coord.lon });
    const userId = decodedToken.id;


    console.log('UserId',userId);


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

        // const currentWeatherFetch = fetch(`${weatherAPI_URL}/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI_Key}&units=imperial`);

        console.log("currentWeatherUrl", `${currentWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);
        console.log("forecastWeatherUrl", `${forecastWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);

        const currentWeatherFetch = fetch(`${currentWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);
        // const forecastWeatherFetch = fetch(`${weatherAPI_URL}/forecast?lat=${lat}&lon=${lon}&exclude=hourly&appid=${weatherAPI_Key}&units=imperial`);
        // const forecastWeatherFetch = fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${weatherAPI_Key}&units=imperial`);
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
