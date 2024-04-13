import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import WeatherBoard from '../../components/WeatherBoard/WeatherBoard';

import './Dashboard.scss';
import '../../styles/partials/_global.scss'

import { weatherAPI_Key, weatherAPI_URL } from '../../components/GeoAPI/GeoAPIOptions';
import { useState } from 'react';
import AlertBoard from '../../components/AlertBoard/AlertBoard';



function Dashboard() {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecastWeather, setForecast] = useState(null)

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

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
            <div className='main'>

                <SearchBar onSearchChange={handleOnSearchChange} />
                {/* {currentWeather && <CurrentWeather weatherData={currentWeather} />}
                {forecastWeather && <WeatherForecast forecastData={forecastWeather} />} */}
                {currentWeather && <WeatherBoard weatherData={currentWeather} forecastData={forecastWeather}/>}
                <AlertBoard />
            </div>
        </>

    );
}

export default Dashboard;
