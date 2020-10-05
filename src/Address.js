import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getZipCode,
  getLatLng,
} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";
import "./Address.css";

function PlacesAutocomplete() {
  const [zipcode, setzipCode] = useState(null);

  const {
    suggestions: { status, data },
    value,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    getGeocode(params)
      .then((response) => getZipCode(response[0], false)) // set to true for short_name
      .then((zipCode) => {
        setzipCode(zipCode);
        //console.log("Zip Code", zipCode);
      })
      .catch((error) => console.log(error.message));
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        //console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      //console.log("sugg", suggestion);
      return (
        <li key={suggestion.place_id} onClick={handleSelect(suggestion)}>
          <strong>{suggestion.structured_formatting.main_text}</strong>{" "}
          <small>{suggestion.structured_formatting.secondary_text}</small>
        </li>
      );
    });
  };

  const params = {
    address: value,
  };

  useEffect(() => {
    getGeocode(params)
      .then((response) => getZipCode(response[0], false)) // set to true for short_name
      .then((zipCode) => {
        setzipCode(zipCode);
        //console.log("Zip Code", zipCode);
      })
      .catch((error) => console.log(error.message));
  }, [params, value]);

  return (
    <div ref={ref} className="address">
      <input
        onChange={handleInput}
        placeholder="Please Enter Your Address"
        value={value}
        className="address__input"
      />

      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="address__ul">{renderSuggestions()}</ul>
      )}
      <div className="address__withZipCode">
        {zipcode && value ? value + " " + zipcode : value}
      </div>
    </div>
  );
}

export default PlacesAutocomplete;
