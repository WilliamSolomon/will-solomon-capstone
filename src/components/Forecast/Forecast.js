

// import NavBar from "../NavBar/NavBar";
// import "./Forecast.scss";
// import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
// import { useState, useEffect } from 'react';
// import axios from "axios";
// import TodayWeather from "../TodayWeather/TodayWeather";
// import Carousel from "../Carousel/Carousel";
// import AlertBoard from "../AlertBoard/AlertBoard";
// import Settings from "../../pages/Settings/Settings";
// import SettingsList from "../SettingsList/SettingsList"

// const Forecast = ({ userLocation }) => {
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [forecastWeather, setForecast] = useState(null);

//     console.log("Beginning forecast");
//     console.log("Beginning forecast location", userLocation);

//     useEffect(() => {
//         // Fetch data when component mounts or when user location changes
//         const fetchData = async () => {

//             try {
//                 if (userLocation.lat && userLocation.lon) {
//                     console.log("Location w/in forecast", userLocation);

//                     const [currentResponse, forecastResponse] = await Promise.all([
//                         axios.get(`${currentWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`),
//                         axios.get(`${forecastWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`)
//                     ]);
//                     setCurrentWeather(currentResponse.data);
//                     setForecast(forecastResponse.data);

//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, [userLocation]); // Fetch data whenever currentCoord or currentCity changes

//     if (!currentWeather || !forecastWeather) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <section className="forecast">
//             <NavBar />
//             {/* <div className="forecast__container">
//                 <h1 className="forecast__title">Today</h1>
//                 <TodayWeather weatherData={currentWeather} />
//                 <h2 className="forecast__sub-title">Daily</h2>
//                 <Carousel weatherData={forecastWeather} />
//             </div> */}
//             {/* <div className="alert__container">
//                 <AlertBoard />
//             </div> */}
//             <div className="settings_container">
//                 <Settings />
//             </div>
//         </section>
//     );
// };

// export default Forecast;

// Forecast.js


import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';

import { useState, useEffect } from 'react';
import axios from "axios";

import "./Forecast.scss";
import NavBar from "../NavBar/NavBar";
import TodayWeather from "../TodayWeather/TodayWeather";
import Carousel from "../Carousel/Carousel";
import AlertBoard from "../AlertBoard/AlertBoard";
import Settings from "../../pages/Settings/Settings";

const Forecast = ({ userLocation }) => {
    const [activeSection, setActiveSection] = useState('Weather');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecast] = useState(null);


    const handleNavigation = (navItem) => {
        setActiveSection(navItem);
    };

    console.log("Beginning forecast");
    console.log("Beginning forecast location", userLocation);

    useEffect(() => {
        // Fetch data when component mounts or when user location changes
        const fetchData = async () => {

            try {
                if (userLocation.lat && userLocation.lon) {
                    console.log("Location w/in forecast", userLocation);

                    const [currentResponse, forecastResponse] = await Promise.all([
                        axios.get(`${currentWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`),
                        axios.get(`${forecastWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`)
                    ]);
                    setCurrentWeather(currentResponse.data);
                    setForecast(forecastResponse.data);

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userLocation]); // Fetch data whenever currentCoord or currentCity changes

    if (!currentWeather || !forecastWeather) {
        return <div>Loading...</div>;
    }

    return (
        <section className="forecast">
            <NavBar handleNavigation={handleNavigation} />
            <div className={`forecast__container ${activeSection !== 'Weather' ? 'hidden' : ''}`}>
                <h1 className="forecast__title">Today</h1>
                <TodayWeather weatherData={currentWeather} />
                <h2 className="forecast__sub-title">Daily</h2>
                <Carousel weatherData={forecastWeather} />
            </div>
            <div className={`alert__container ${activeSection !== 'Alerts' ? 'hidden' : ''}`}>
                <AlertBoard />
            </div>
            <div className={`settings__container ${activeSection !== 'Settings' ? 'hidden' : ''}`}>
                <Settings />
            </div>
        </section>
    );
};

export default Forecast;

