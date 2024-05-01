// import NavBar from "../NavBar/NavBar";
// import "./Forecast.scss"
// import CurrentWeather from "../CurrentWeather/CurrentWeather";
// import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
// import { useState, useEffect } from 'react';
// import axios from "axios";
// import TodayWeather from "../TodayWeather/TodayWeather";
// import Carousel from "../Carousel/Carousel";


// const Forecast = () => {
//     const [currentWeather, setCurrentWeather] = useState(null)
//     const [forecastWeather, setForecast] = useState(null)
//     const [currentCoord, setcurrentCoord] = useState({lat: 40.7128, lon: -74.0060});
//     const [currentCity, setcurrentCity] = useState(["New York City, New York, US"]);
//     const [token, setToken] = useState(null)


//     useEffect(() => {

//         console.log("Made it here");
//         console.log("Latitude", currentCoord.lat);
//         console.log("Longitud", currentCoord.lon);

//         const currentWeatherFetch = fetch(`${currentWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`);
//         const forecastWeatherFetch = fetch(`${forecastWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`);

//         Promise.all([currentWeatherFetch, forecastWeatherFetch])
//             .then(async (response) => {
//                 const weatherResponse = await response[0].json();
//                 const forecastResponse = await response[1].json();

//                 setCurrentWeather({ city: currentCity, ...weatherResponse });
//                 setForecast({ city: currentCity, ...forecastResponse });
//             })
//             .catch((error) => console.error(error));;
//     }, []);

//     console.log("Current Weather", currentWeather);

//     return (
//         <section className="forecast">
//             <NavBar></NavBar>
//             <div className="forecast__container">
//                 <h1 className="forecast__title">Today</h1>
//                 <TodayWeather weatherData={currentWeather} ></TodayWeather>
//                 <h2 className="forecast__sub-title">Daily</h2>
//                 <Carousel weatherData={forecastWeather}/>
//             </div>
//         </section>
//     )
// }

// export default Forecast;

import NavBar from "../NavBar/NavBar";
import "./Forecast.scss";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
import { useState, useEffect } from 'react';
import axios from "axios";
import TodayWeather from "../TodayWeather/TodayWeather";
import Carousel from "../Carousel/Carousel";

const Forecast = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecast] = useState(null);
    const [currentCoord, setcurrentCoord] = useState({lat: 40.7128, lon: -74.0060});
    const [currentCity, setcurrentCity] = useState(["New York City, New York, US"]);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New state for loading indicator

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [currentResponse, forecastResponse] = await Promise.all([
                    axios.get(`${currentWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`),
                    axios.get(`${forecastWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`)
                ]);
                setCurrentWeather({ city: currentCity, ...currentResponse.data });
                setForecast({ city: currentCity, ...forecastResponse.data });
                setIsLoading(false); // Set loading to false after data retrieval
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Render loading indicator while data is being fetched
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
