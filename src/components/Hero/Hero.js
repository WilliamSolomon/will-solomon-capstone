import "./Hero.scss"
import SearchField from "../SearchField/SearchField";

const locationIconURL = "http://localhost:8080/images/icons/location.svg"
const searchIconURL = "http://localhost:8080/images/icons/location_target.svg"

const Hero = ({setAddressInfo, userLocation}) => {
  
    return (
        <section className="hero">
            <div className="hero__background">
                <div className="hero__top-bar">
                    <h1 className="hero__logo">
                        WeatherCap
                    </h1>
                    <div className="hero__location">
                        <img className="hero__location-icon" src={locationIconURL} alt="location icon" />
                        <div className="hero__location-details">
                            <p className="hero__location-title">Current Location</p>
                            <p className="hero__location-current">{userLocation}</p>
                        </div>
                    </div>
                </div>

                <div className="hero__bottom">
                    <div className="hero__search">
                        <h2 className="hero__greeting">Weather insight for every moment</h2>
                        <div className="hero__divider-bar"></div>
                        <div className="hero__search-bar">
                            <SearchField setAddressInfo={setAddressInfo} />
                            <img className="hero__search-icon" src={searchIconURL} alt="search icon" />
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Hero;