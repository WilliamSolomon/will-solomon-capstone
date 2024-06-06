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
            <div className="weather-card__top">
                <p className="weather-card__temperature">{`${Math.round(
                    weatherData.temp.day
                )}°F`}</p>
            </div>
            <div className="weather-card__bottom">
                <div className="weather-card__summary">
                    <p className="weather-card__description">
                        {weatherData.weather[0].description}
                    </p>
                    <img
                        alt="weather icon"
                        className="weather-card__icon"
                        src={`icons/${weatherData.weather[0].icon}.png`}
                    />
                </div>
                <label className="weather-card__dayOfWeek">
                    {forecastDays[index]}
                </label>
            </div>
        </div>
    );
};

export default FutureWeather;