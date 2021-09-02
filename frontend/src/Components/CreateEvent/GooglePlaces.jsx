import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useState } from "react";
import scriptLoader from "react-async-script-loader";
import TextField from "@material-ui/core/TextField";

function GooglePlace({ isScriptLoaded, isScriptLoadSucceed, form, setForm }) {
  const [address, setAddress] = useState("");
  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        const location = {
          event_map_cor_lat: latLng.lat,
          event_map_cor_lng: latLng.lng,
        };
        setForm({ ...form, ...location });
      })
      .catch((error) => console.error("Error", error));
  };

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div className="google">
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div style={{ display: "block", width: "100%" }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Location"
                variant="outlined"
                {...getInputProps({
                  placeholder: "Enter Address ...",
                })}
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "orange", cursor: "pointer" }
                    : { backgroundColor: "white", cursor: "pointer" };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  } else {
    return <h1>Hello from google Places </h1>;
  }
}
export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_kRsd4QNiBkJ2P35TGRuL2sXYOeNyEmg&libraries=places",
])(GooglePlace);
