

import NavBar from "../NavBar/NavBar";
import "./Forecast.scss";
import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import axios from "axios";
import TodayWeather from "../TodayWeather/TodayWeather";
import Carousel from "../Carousel/Carousel";

const Forecast = ({ userLocation }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecast] = useState(null);

    // const [currentCoord, setCurrentCoord] = useState({});
    // const [currentCity, setCurrentCity] = useState("");
    // const [isLoading, setIsLoading] = useState(true);

    console.log("Beginning forecast");
    console.log("Beginning forecast location", userLocation);

    // useEffect(() => {
    //     if (userLocation.address && userLocation.lat && userLocation.lon) {
    //         setCurrentCity(userLocation.address);
    //         setCurrentCoord({ lat: userLocation.lat, lon: userLocation.lon });
    //         console.log("Child userLocation", userLocation);
    //         console.log("Child userCoord", currentCity, currentCoord);
    //     }
    // }, [userLocation.address]);

    useEffect(() => {
        // Fetch data when component mounts or when user location changes
        const fetchData = async () => {

            try {
                if (userLocation.lat && userLocation.lon) {
                    console.log("Location w/in forecast", userLocation);
                    // console.log("Location w/in forecast", userLocation.address, userLocation.lat, userLocation.lon);
                    // console.log("CurrentCoord w/in forecast", currentCoord);
                    const [currentResponse, forecastResponse] = await Promise.all([
                        axios.get(`${currentWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`),
                        axios.get(`${forecastWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`)
                    ]);
                    setCurrentWeather(currentResponse.data);
                    setForecast(forecastResponse.data);
                    // setIsLoading(false); // Set loading to false after data retrieval
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userLocation]); // Fetch data whenever currentCoord or currentCity changes

    // useEffect(() => {
    //     // Fetch data when component mounts or when user location changes
    //     console.log("Ready with userLocation", userLocation);
    //     const fetchData = async () => {
    //         try {
    //             if (userLocation.address) {
    //                 const [currentResponse, forecastResponse] = await Promise.all([
    //                     axios.get(`${currentWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`),
    //                     axios.get(`${forecastWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`)
    //                 ]);
    //                 setCurrentWeather({ city: currentCity, ...currentResponse.data });
    //                 setForecast({ city: currentCity, ...forecastResponse.data });
    //                 setIsLoading(false); // Set loading to false after data retrieval
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, [userLocation]); // Fetch data whenever userLocation changes


    // if (isLoading) {
    // // if (!userLocation.address) {
    //     return <div>Loading...</div>;
    // }

    if (!currentWeather || !forecastWeather) {
        return <div>Loading...</div>;
    }

    return (
        <section className="forecast">
            <NavBar />
            <div className="forecast__container">
                <h1 className="forecast__title">Today</h1>
                <TodayWeather weatherData={currentWeather} />
                <h2 className="forecast__sub-title">Daily</h2>
                <Carousel weatherData={forecastWeather} />
            </div>
        </section>
    );
};

export default Forecast;
