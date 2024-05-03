// import NavBar from "../NavBar/NavBar";
// import "./Forecast.scss";
// import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
// import { useState, useEffect } from 'react';
// import axios from "axios";
// import TodayWeather from "../TodayWeather/TodayWeather";
// import Carousel from "../Carousel/Carousel";

// const Forecast = ({ userLocation }) => {
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [forecastWeather, setForecast] = useState(null);
//     const [currentCoord, setCurrentCoord] = useState({});
//     const [currentCity, setCurrentCity] = useState("");
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         console.log("Triggered child", userLocation);
//     }, [userLocation])

//     useEffect(() => {
//         // Fetch data when component mounts or when user location changes
//         const fetchData = async () => {
//             try {
//                 const [currentResponse, forecastResponse] = await Promise.all([
//                     axios.get(`${currentWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`),
//                     axios.get(`${forecastWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`)
//                 ]);
//                 setCurrentWeather({ city: currentCity, ...currentResponse.data });
//                 setForecast({ city: currentCity, ...forecastResponse.data });
//                 setIsLoading(false); // Set loading to false after data retrieval
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, []); // Fetch data whenever currentCoord changes

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <section className="forecast">
//             <NavBar />
//             <div className="forecast__container">
//                 <h1 className="forecast__title">Today</h1>
//                 {/* <TodayWeather weatherData={currentWeather} /> */}
//                 <h2 className="forecast__sub-title">Daily</h2>
//                 {/* <Carousel weatherData={forecastWeather} /> */}
//             </div>
//         </section>
//     );
// };

// export default Forecast;

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
    const [currentCoord, setCurrentCoord] = useState({});
    const [currentCity, setCurrentCity] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userLocation) {
            setCurrentCity(userLocation.address);
            setCurrentCoord({ lat: userLocation.lat, lon: userLocation.lng });
            console.log("Child userLocation", userLocation);
        }
    }, [userLocation]);

    // useEffect(() => {
    //     // Fetch data when component mounts or when user location changes
    //     const fetchData = async () => {
    //         try {
    //             const [currentResponse, forecastResponse] = await Promise.all([
    //                 axios.get(`${currentWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`),
    //                 axios.get(`${forecastWeatherUrl}/?lat=${currentCoord.lat}&lon=${currentCoord.lon}`)
    //             ]);
    //             setCurrentWeather({ city: currentCity, ...currentResponse.data });
    //             setForecast({ city: currentCity, ...forecastResponse.data });
    //             setIsLoading(false); // Set loading to false after data retrieval
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchData();
    // }, [userLocation]); // Fetch data whenever currentCoord or currentCity changes

    useEffect(() => {
        // Fetch data when component mounts or when user location changes
        console.log("REady with userLocation", userLocation);
        const fetchData = async () => {
            try {
                if (userLocation) {
                    // const [currentResponse, forecastResponse] = await Promise.all([
                    //     axios.get(`${currentWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`),
                    //     axios.get(`${forecastWeatherUrl}/?lat=${userLocation.lat}&lon=${userLocation.lon}`)
                    // ]);
                    // setCurrentWeather({ city: currentCity, ...currentResponse.data });
                    // setForecast({ city: currentCity, ...forecastResponse.data });
                    // setIsLoading(false); // Set loading to false after data retrieval
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [userLocation]); // Fetch data whenever userLocation changes
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="forecast">
            <NavBar />
            <div className="forecast__container">
                <h1 className="forecast__title">Today</h1>
                {/* <TodayWeather weatherData={currentWeather} /> */}
                <h2 className="forecast__sub-title">Daily</h2>
                {/* <Carousel weatherData={forecastWeather} /> */}
            </div>
        </section>
    );
};

export default Forecast;
