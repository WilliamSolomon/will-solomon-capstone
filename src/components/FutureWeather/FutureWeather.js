// import "./FutureWeather.scss";

// const weekDays = [
//     "Mon",
//     "Tues",
//     "Wed",
//     "Thurs",
//     "Fri",
//     "Sat",
//     "Sun"
// ];

// const FutureWeather = ({ weatherData }) => {

//     const dayOfWeek = new Date().getDay();
//     const forecastDays = weekDays.slice(dayOfWeek, weekDays.length).concat(
//         weekDays.slice(0, dayOfWeek)
//     );

//     return (
//         <>
//         <></>
//             {weatherData.daily.slice(1, 7).map((item, index) => (

//             <div className="weather-card" key={index}>
//                 <div className="weather">
//                     <div className="weather__top">
//                         <div className="weather__title">
//                         <label className="weather__dayOfWeek">{forecastDays[index]}</label>
//                             <p className="weather__description">{item.weather[0].description}</p>
//                         </div>
//                         <img alt="weather icon" className="weather__icon" src={`icons/${item.weather[0].icon}.png`} />
//                     </div>
//                     <div className="weather__bottom">
//                         <p className="weather__temperature">{`${Math.round(item.temp.day)}°F`}</p>
//                     </div>
//                 </div>
//             </div>
//     ))}
//         </>


//     )
// }

// export default FutureWeather;

import React from "react";
import "./FutureWeather.scss";

const FutureWeather = ({ index, weatherData }) => {
    const weekDays = [
        "Mon",
        "Tues",
        "Wed",
        "Thurs",
        "Fri",
        "Sat",
        "Sun"
    ];

    console.log("Weather Index data", index);

    const dayOfWeek = new Date().getDay();
    const forecastDays = weekDays
        .slice(dayOfWeek, weekDays.length)
        .concat(weekDays.slice(0, dayOfWeek));

    return (
        <div className="weather-card">
            <div className="weather">
                <div className="weather__top">
                    <div className="weather__title">
                        <label className="weather__dayOfWeek">
                            {forecastDays[index]}
                        </label>
                        <p className="weather__description">
                            {weatherData.weather[0].description}
                        </p>
                    </div>
                    <img
                        alt="weather icon"
                        className="weather__icon"
                        src={`icons/${weatherData.weather[0].icon}.png`}
                    />
                </div>
                <div className="weather__bottom">
                    <p className="weather__temperature">{`${Math.round(
                        weatherData.temp.day
                    )}°F`}</p>
                </div>
            </div>
        </div>
    );
};

export default FutureWeather;