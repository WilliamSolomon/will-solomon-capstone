import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import Header from '../../components/Header/Header';
// import SearchModal from '../../components/SearchModal/SearchModal';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeatherBoard from '../../components/WeatherBoard/WeatherBoard';
import AlertBoard from '../../components/AlertBoard/AlertBoard';

import './Dashboard.scss';
import '../../styles/partials/_global.scss'
// import authenticateUser from '../../utils/authenticateUser';
// import searchIcon from '../../assets/icons/search-24px.svg';
import { Link } from 'react-router-dom';

function Dashboard() {
    //// JWT Authentication
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecastWeather, setForecast] = useState(null)
    const [userCity, setUserCity] = useState(null);
    // const [userCoord, setUserCoord] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [token, setToken] = useState(null)
    const [userFirstName, setUserFirstName] = useState(null)
    // const [userId, setUserId] = useState(null)

    useEffect(() => {
        // getItem from sessionStorage token
        const storageToken = localStorage.getItem('token');
        setToken(storageToken);

        // const token = localStorage.getItem('token');


        // If theres not a token then setFailedAuth to true and return 
        if (!storageToken) {
            console.log("No storage token");
            setFailedAuth(true)
        }
        // Otherwise we will check to see if the current user is authorized to be on this dashboard


        const authorizeUser = async () => {
            try {
                console.log("authUser Storage token", storageToken);
                // Make a get request to "http://localhost:8080/api/users/current"
                const response = await axios.get('http://localhost:8080/api/users/current', {
                    headers: {
                        Authorization: `Bearer ${storageToken}`
                    }
                })


                setUser(response.data)
                // Pass bearer token in the headers
                // set user as response.data


            } catch (error) {
                console.log(error);
                setFailedAuth(true)
            }
        }
        authorizeUser()
        // Pass Headers on this request 
        // use the Authorization key to pass a Bearer token
        // Use string interpolation to pass `Bearer ${token}` as value for authorization
        // On successful response setUser to response.data
        // On failure setFailed auth to true

    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setFailedAuth(true);
    };

    useEffect(() => {

        if (!token) {
            return; // Exit early if token is null
        }
        console.log("Token: ", token);

        const decodedToken = jwtDecode(token);

        const userId = decodedToken.id;
        setUserCity(decodedToken.city);
        const userCoord = decodedToken.coord;

        setUserFirstName(decodedToken.first_name)



        console.log("User Coordinates: ", userCoord);
        console.log("User Forecast City: ", userCity);

        const currentWeatherFetch = fetch(`${currentWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);
        const forecastWeatherFetch = fetch(`${forecastWeatherUrl}/${userId}?lat=${userCoord.lat}&lon=${userCoord.lon}`);

        Promise.all([currentWeatherFetch, forecastWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: userCity, ...weatherResponse });
                setForecast({ city: userCity, ...forecastResponse });
            })
            .catch((error) => console.error(error));;
    }, [token]);

    useEffect(() => {
        handleModalToggle(isModalOpen)
    })

    const handleModalToggle = (shouldOpen) => {
        if (shouldOpen) {
            document.body.classList.add('no-scroll');
            openModal();
        } else {
            document.body.classList.remove('no-scroll')
            closeModal()
        }
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    if (failedAuth) {
        return (
            <main className="dashboard">
                <p>You must be logged in to see this page.</p>
                <p>
                    <Link to="/login">Log in</Link>
                </p>
            </main>
        );
    }

    if (user === null) {
        return (
            <main className="dashboard">
                <p>Loading...</p>
            </main>
        );
    }

    //// Dashboard Component 

    return (
        <>
            <Header />
            <main>
                <div className="dashboard">
                    <h2 className='dashboard__title'>
                        Hello, {userFirstName}! Location: {userCity}
                    </h2>
                    <button className="dashboard__logout" onClick={handleLogout}>
                        Log out
                    </button>
                    {/* <div className="dashboard__actions">
                        {userCity}
                        <SearchModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onConfirm={() => {
                                localStorage.setItem('user_city', userCity);
                                localStorage.setItem('user_lat', userCoord.lat);
                                localStorage.setItem('user_lon', userCoord.lon);
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

                    </div> */}
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
