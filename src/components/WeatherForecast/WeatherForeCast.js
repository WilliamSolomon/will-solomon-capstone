import "./WeatherForeCast.scss";

const WeatherForeCast = () => {
    return (
        <div className="weather">
            <div className="weather__top">
                <div className="weather__title">
                    <p className="weather__city">Brooklyn</p>
                    <p className="weather__description">Sunny</p>
                </div>
                <img alt="weather icon" className="weather__icon" src="icons/01d.png" />
            </div>
            <div className="weather__bottom">
                <p className="weather__temperature">56°F</p>
                <div className="weather__details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">62°F</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Winds</span>
                        <span className="parameter-value">2 f/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">15%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">15 bars</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default WeatherForeCast;