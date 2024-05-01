// import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
// import { useState, useEffect } from 'react';
// import axios from "axios";
import Forecast from '../../components/Forecast/Forecast';
import Hero from '../../components/Hero/Hero';
import "./Weather.scss"

const Weather = () => {
    return (
        <main className='weather__container'>
            <div className='weather__content'>
                <Hero></Hero>
                <Forecast></Forecast>
            </div>
        </main>
    )
}

export default Weather;