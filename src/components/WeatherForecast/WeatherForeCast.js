import "./WeatherForecast.scss"
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion"

const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


const WeatherForecast = ({ forecastData }) => {
    const dayOfWeek = new Date().getDay();
    const forecastDays = weekDays.slice(dayOfWeek, weekDays.length).concat(
        weekDays.slice(0, dayOfWeek)
    );

    return (
        <>
            <label className="forecast__title">Daily</label>
            <Accordion allowZeroExpanded>
                {forecastData.list.slice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="forecast__daily-item">
                                    <img
                                        alt=""
                                        className="forecast__icon-small"
                                        src={`icons/${item.weather[0].icon}.png`} />
                                    <label className="forecast__day">{forecastDays[index]}</label>
                                    <label className="forecast__description">{item.weather[0].description}</label>
                                    <label className="forecast__min-max">{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</label>
                                </div>

                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="forecast__details-grid">
                                <div className="forecast__details-grid-item">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure}</label>
                                </div>
                                <div className="forecast__details-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="forecast__details-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="forecast__details-grid-item">
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="forecast__details-grid-item">
                                    <label>Sea Level</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="forecast__details-grid-item">
                                    <label>Feels Like</label>
                                    <label>{Math.round(item.main.feels_like)}°F</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>

        </>
    )
}

export default WeatherForecast;