import { useEffect, useState } from 'react';
import Forecast from '../../components/Forecast/Forecast';
import Hero from '../../components/Hero/Hero';
import "./Weather.scss"
import AlertBoard from '../../components/AlertBoard/AlertBoard';

const Weather = () => {
    const [addressInfo, setAddressInfo] = useState([])

    // useEffect to check localStorage and set addressInfo
    useEffect(() => {
        const storedAddress = localStorage.getItem('user_address');
        const storedLat = localStorage.getItem('user_lat');
        const storedLng = localStorage.getItem('user_lng');

        if (storedLng) {
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
                <Hero setAddressInfo={setAddressInfo} userLocation={addressInfo.address} />
                {addressInfo.lon && <Forecast userLocation={addressInfo} />}
            </div>
        </main>
    )
}

export default Weather;