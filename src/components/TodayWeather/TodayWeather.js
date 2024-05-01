import "./TodayWeather.scss";



const TodayWeather = ({ weatherData }) => {
    console.log("Weather Data Received", weatherData);

    return (
        <div className="current-weather">
            <div className="current-weather__left">
                <p className="current-weather__temperature">{`${Math.round(weatherData.main.temp)}°F`}</p>
                <div className="current-weather__summary">
                    <p className="current-weather__description">{weatherData.weather[0].description}</p>
                    <img alt="weather icon" className="current-weather__icon" src={`icons/${weatherData.weather[0].icon}.png`} />
                </div>
            </div>
            <div className="current-weather__right">
                    <div className="current-weather__row">
                        <span className="current-weather__label">Feels like:</span>
                        <span className="current-weather__value">{`${Math.round(weatherData.main.feels_like)}°F`}</span>
                    </div>
                    <div className="current-weather__row">
                        <span className="current-weather__label">Wind:</span>
                        <span className="current-weather__value">{`${Math.round(weatherData.wind.speed)} f/s`}</span>
                    </div>
                    <div className="current-weather__row">
                        <span className="current-weather__label">Humidity:</span>
                        <span className="current-weather__value">{`${weatherData.main.humidity}%`}</span>
                    </div>
                    <div className="current-weather__row">
                        <span className="current-weather__label">Pressure:</span>
                        <span className="current-weather__value">{weatherData.main.pressure} hPA</span>
                    </div>
            </div>

        </div>
    )
}

export default TodayWeather;