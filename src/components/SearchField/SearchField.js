import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import './SearchField.scss'; 

const SearchField = ({setAddressInfo}) => {
    const [address, setAddress] = useState('');
  
    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        setAddress(address);
    
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                const { lat, lng } = latLng;
                // Check if lat and lng are truthy before proceeding
                if (lat && lng) {
                    // Use setAddressInfo with address, lat, and lng
                    setAddressInfo({
                        address: address,
                        lat: lat,
                        lon: lng
                    });
                    const sentAddressInfo = {
                        address: address,
                        lat: lat,
                        lon: lng
                    };
                    console.log('Sent Address Info', sentAddressInfo);
                } else {
                    console.log('Latitude or Longitude is not available.');
                }
            })
            .catch((error) => console.error('Error', error));
    };


    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Enter your city',
                            className: 'search-field__input', // Reference the class from SCSS
                        })}
                    />
                    <div className="search-field__autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                                ? 'search-field__suggestion-item--active'
                                : 'search-field__suggestion-item';
                            return (
                                <div
                                    key= {index}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default SearchField;