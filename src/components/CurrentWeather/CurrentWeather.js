import "./CurrentWeather.scss";

const CurrentWeather = ({weatherData}) => {
    return (
        <div className="weather">
            <div className="weather__top">
                <div className="weather__title">
                    <p className="weather__city">{weatherData.city}</p>
                    <p className="weather__description">{weatherData.weather[0].description}</p>
                </div>
                <img alt="weather icon" className="weather__icon" src={`icons/${weatherData.weather[0].icon}.png`} />
            </div>
            <div className="weather__bottom">
                <p className="weather__temperature">{`${Math.round(weatherData.main.temp)}°F`}</p>
                <div className="weather__details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">{`${Math.round(weatherData.main.feels_like)}°F`}</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{`${Math.round(weatherData.wind.speed)} f/s`}</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{`${weatherData.main.humidity}%`}</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{weatherData.main.pressure} hPA</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CurrentWeather;