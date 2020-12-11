import React, { useState, useCallback, useContext, memo} from 'react';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import OverviewFormContext from '../../contexts/OverviewFormContext';

const GoogleMapOverviewForm = ({ initLocation, initLat, initLng }) => {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: initLat, lng: initLng});
    const [marker, setMarker] = useState(null);
    const [autocomplete, setAutoComplete] = useState(null);
    const [location, setLocation] = useState(initLocation ? initLocation : null);

    const { unsetValidLocation, onLocationChange } = useContext(OverviewFormContext);

    const containerStyle = {
        width: '384px',
        height: '384px'
    };

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);

        setMarker(new window.google.maps.Marker({
            position: {
                lat: initLat,
                lng: initLng
            },
            map
        }));

        map.panTo(center);
    }, [initLat, initLng, center]);

    const unMount = useCallback((map) => {
        setMap(null);
    }, []);

    const autocompleteOnLoad = (autocomplete) => {
        setAutoComplete(autocomplete);
    }

    const onPlaceChanged = () => {
        if (autocomplete) {
            const newLat = autocomplete.getPlace().geometry.location.lat();
            const newLng = autocomplete.getPlace().geometry.location.lng();
            const newLocation = document.querySelector('#autocomplete').value
            setLocation(newLocation);
            onLocationChange(newLocation, newLat, newLng)
            setMarker(new window.google.maps.Marker({ position: { lat: newLat, lng: newLng }, map }));
            setCenter({ lat: newLat, lng: newLng });
        } else {
            console.log("Autocomplete is not loaded yet");
        }
    }

    const handleInputChange = (e) => {
        setLocation(e.target.value);
        unsetValidLocation(e);
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={1}
            onLoad={onLoad}
            unMount={unMount}>
            <Autocomplete onLoad={autocompleteOnLoad} onPlaceChanged={onPlaceChanged}>
                <input id='autocomplete' type="text" placeholder="Enter your city here"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 16px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `16px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                    }}
                    value={location}
                    onChange={handleInputChange}/>
            </Autocomplete>
        </GoogleMap>
    )
}

export default memo(GoogleMapOverviewForm);