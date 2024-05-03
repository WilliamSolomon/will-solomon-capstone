// import { currentWeatherUrl, forecastWeatherUrl } from '../../components/GeoAPI/GeoAPIOptions';
import { useEffect, useState } from 'react';
// import axios from "axios";
import Forecast from '../../components/Forecast/Forecast';
import Hero from '../../components/Hero/Hero';
import "./Weather.scss"

const Weather = () => {
    const [addressInfo, setAddressInfo] = useState([])

    // useEffect to check localStorage and set addressInfo
    useEffect(() => {
        const storedAddress = localStorage.getItem('user_address');
        const storedLat = localStorage.getItem('user_lat');
        const storedLng = localStorage.getItem('user_lng');

        if (storedLng) {
            console.log("Stored Address is present", storedAddress);
            console.log("Stored Latitude is present", storedLat);
            console.log("Stored Longitude is present", storedLng);
            setAddressInfo({
                address: storedAddress,
                lat: storedLat,
                lon: storedLng
            });
            console.log("Use effect address info:::", {
                address: storedAddress,
                lat: storedLat,
                lon: storedLng
            });
        }
    }, []); // This useEffect runs only once on component mount

    useEffect(() => {
        console.log("Parent triggered", addressInfo);
    }, [addressInfo])

    // useEffect to watch for changes in addressInfo and update local storage
    useEffect(() => {
        console.log("Storage update triggered", addressInfo);
        if (addressInfo.address && addressInfo.lat && addressInfo.lon) {
            localStorage.setItem('user_address', addressInfo.address);
            localStorage.setItem('user_lat', addressInfo.lat);
            localStorage.setItem('user_lng', addressInfo.lon);
        }
    }, [addressInfo]);



    return (
        <main className='weather__container'>
            <div className='weather__content'>
                <Hero setAddressInfo={setAddressInfo} userLocation={addressInfo ? addressInfo.address : null} />
                {addressInfo && <Forecast userLocation={addressInfo} />}
            </div>
        </main>
    )
}

export default Weather;