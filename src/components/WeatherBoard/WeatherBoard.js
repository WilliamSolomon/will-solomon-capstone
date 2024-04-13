import "./WeatherBoard.scss";

const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const WeatherBoard = ({ weatherData, forecastData }) => {

    const dayOfWeek = new Date().getDay();
    const forecastDays = weekDays.slice(dayOfWeek, weekDays.length).concat(
        weekDays.slice(0, dayOfWeek)
    );

    console.log(forecastDays);

    return (
        <>
            <p className="weather__city">Location:{weatherData.city}</p>
            <div className="weather">
                <div className="weather__top">
                    <div className="weather__title">
                        <p className="">Today</p>
                        <p className="weather__description">{weatherData.weather[0].description}</p>
                    </div>
                    <img alt="weather icon" className="weather__icon" src={`icons/${weatherData.weather[0].icon}.png`} />
                </div>
                <div className="weather__bottom">
                    <p className="weather__temperature">{`${Math.round(weatherData.main.temp)}°F`}</p>
                    {/* <div className="weather__details">
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

                    </div> */}
                </div>

            </div> 


            {forecastData.list.slice(0, 7).map((item, index) => (
            //     <AccordionItem >
            //         <AccordionItemHeading>
            //             <AccordionItemButton>
            //                 <div className="forecast__daily-item">
            //                     <img
            //                         alt=""
            //                         className="forecast__icon-small"
            //                         src={`icons/${item.weather[0].icon}.png`} />
            //                     <label className="forecast__day">{forecastDays[index]}</label>
            //                     <label className="forecast__description">{item.weather[0].description}</label>
            //                     <label className="forecast__min-max">{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</label>
            //                 </div>

            //             </AccordionItemButton>
            //         </AccordionItemHeading>
            //         <AccordionItemPanel>
            //             <div className="forecast__details-grid">
            //                 <div className="forecast__details-grid-item">
            //                     <label>Pressure</label>
            //                     <label>{item.main.pressure}</label>
            //                 </div>
            //                 <div className="forecast__details-grid-item">
            //                     <label>Humidity</label>
            //                     <label>{item.main.humidity}%</label>
            //                 </div>
            //                 <div className="forecast__details-grid-item">
            //                     <label>Clouds</label>
            //                     <label>{item.clouds.all}%</label>
            //                 </div>
            //                 <div className="forecast__details-grid-item">
            //                     <label>Wind Speed</label>
            //                     <label>{item.wind.speed} m/s</label>
            //                 </div>
            //                 <div className="forecast__details-grid-item">
            //                     <label>Sea Level</label>
            //                     <label>{item.main.sea_level}m</label>
            //                 </div>
            //                 <div className="forecast__details-grid-item">
            //                     <label>Feels Like</label>
            //                     <label>{Math.round(item.main.feels_like)}°F</label>
            //                 </div>
            //             </div>
            //         </AccordionItemPanel>
            //     </AccordionItem>
            // ))}

            <div className="weather-card" key={index}>
                <div className="weather">
                    <div className="weather__top">
                        <div className="weather__title">
                        <label className="">{forecastDays[index]}</label>
                            <p className="weather__description">{item.weather[0].description}</p>
                        </div>
                        <img alt="weather icon" className="weather__icon" src={`icons/${item.weather[0].icon}.png`} />
                    </div>
                    <div className="weather__bottom">
                        <p className="weather__temperature">{`${Math.round(item.main.temp)}°F`}</p>
                        {/* <div className="weather__details">
                            <div className="parameter-row">
                                <span className="parameter-label">Details</span>
                            </div>
                            <div className="parameter-row">
                                <span className="parameter-label">Humidity</span>
                                <span className="parameter-value">{`${item.main.humidity}%`}</span>
                            </div>

                        </div> */}
                    </div>

                </div>
            </div>

    ))}
        </>


    )
}

export default WeatherBoard;