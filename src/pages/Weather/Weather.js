// import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
// import { useState, useEffect } from 'react';
// import axios from "axios";
import Hero from '../../components/Hero/Hero';
import "./Weather.scss"

const Weather = () => {
    return (
        <main className='weather__container'>
                <Hero></Hero>
        </main>
    )
}

export default Weather;