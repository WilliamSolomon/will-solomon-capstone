import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import FutureWeather from "../FutureWeather/FutureWeather";
import "./Carousel.scss";

const Carousel = ({ weatherData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % weatherData.daily.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? weatherData.daily.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel__container">
            <BsArrowLeftCircleFill
                className="carousel__arrow-left"
                onClick={goToPrevSlide}
            />
            <div className="carousel">
                {weatherData.daily.slice(currentIndex, currentIndex + 6).map((item, index) => {
                    return <FutureWeather key={index} index={(currentIndex + index) % 7} weatherData={item} />;
                })}
            </div>
            <BsArrowRightCircleFill
                className="carousel__arrow-right"
                onClick={goToNextSlide}
            />
        </div>
    );
};

export default Carousel;

