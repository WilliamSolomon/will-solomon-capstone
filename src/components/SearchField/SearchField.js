import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import './SearchField.scss'; // Import your SCSS file

const SearchField = () => {
    const [address, setAddress] = useState('');

    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log('Success', latLng))
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

