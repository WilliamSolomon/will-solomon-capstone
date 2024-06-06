import { useState } from "react";
import "./SearchBar.scss";
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoAPIURL, GeoAPIOptions } from "../GeoAPI/GeoAPIOptions";

const SearchBar = ({ onConfirm }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${geoAPIURL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, GeoAPIOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.region}, ${city.countryCode}`,
                        }

                    })
                }
            })
            .catch(error => console.error(error));
    }

    const handleOnChange = (searchData) => {
        // setSearch(searchData);
        onConfirm(searchData);
        // onSearchChange(searchData);
    }

    return (
        <div className="search">
            <AsyncPaginate
                placeholder='Search for your city'
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
        </div>
    )
}

export default SearchBar;