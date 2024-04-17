import { weatherAPI_Key, weatherAPI_URL } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Header from '../../components/Header/Header';
import SearchModal from '../../components/SearchModal/SearchModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import WeatherBoard from '../../components/WeatherBoard/WeatherBoard';
import AlertBoard from '../../components/AlertBoard/AlertBoard';


import './Delete.scss';
import '../../styles/partials/_global.scss'






function Delete() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecastWeather, setForecast] = useState(null)
    // const [userCity, setUserCity] = useState("Miami-Dade County, Florida, US");
    // const [userCoord, setUserCoord] = useState({ lat: '25.7743', lon: '-80.1937' });

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [userCity, setUserCity] = useState(decodedToken.city);
    const [userCoord, setUserCoord] = useState(decodedToken.coord);
    // const userId = decodedToken.id;

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");
        const city = searchData.label

        //searchData return example
        // {{value: '25.269722222 55.309444444', label: 'Dubai, Emirate of Dubai, AE'}

        console.log('SearchData',searchData)

        const currentWeatherFetch = fetch(`${weatherAPI_URL}/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI_Key}&units=imperial`);
        const forecastWeatherFetch = fetch(`${weatherAPI_URL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPI_Key}&units=imperial`);

        Promise.all([currentWeatherFetch, forecastWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse })
                setForecast({ city: searchData.label, ...forecastResponse })
            })
            .catch((error) => console.error(error));

    }

    console.log("Current Weather", currentWeather)
    console.log("Forecast", forecastWeather)

    return (
        <>
            <Header />
            <main>
                <div className="dashboard">
                    <p className='dashboard__title'>
                        DASHBOARD TITLE: {userCity}
                    </p>
                    <SearchBar onSearchChange={handleOnSearchChange} />
                    {currentWeather && <CurrentWeather weatherData={currentWeather} />}
                    {forecastWeather && <WeatherForecast forecastData={forecastWeather} />}
                    {currentWeather && <WeatherBoard weatherData={currentWeather} forecastData={forecastWeather} />}
                    <AlertBoard />
                </div>
            </main>
        </>

    );
}

export default Delete;
