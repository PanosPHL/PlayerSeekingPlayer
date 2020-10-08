import React, { useState, useContext, useCallback, memo } from 'react';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import SignUpContext from '../contexts/SignUpContext';

const GoogleMapSignUpForm = ({ apiKey }) => {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [marker, setMarker] = useState(null);
    const [autocomplete, setAutoComplete] = useState(null);
    const {
        handlers: {
            setLocation
        }
    } = useContext(SignUpContext);

    const initialCenter = {
        lat: 44.3148443,
        lng: -85.60236429999999
    }

    const containerStyle = {
        width: '400px',
        height: '400px'
      };

      const onLoad = useCallback((map) => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
          setMap(map);
      });

      const unMount = useCallback((map) => {
          setMap(null);
      }, []);

      const autocompleteOnLoad = (autocomplete) => {
          setAutoComplete(autocomplete);
      }

      const onPlaceChanged = () => {
          console.log(autocomplete);
          if (autocomplete) {
              const lat = autocomplete.getPlace().geometry.location.lat();
              const lng = autocomplete.getPlace().geometry.location.lng();
              setLocation(`${lat}, ${lng}`)
              setMarker(new window.google.maps.Marker({ position: { lat, lng }, map }));
              setCenter({ lat, lng });
          } else {
              console.log("Autocomplete is not loaded yet");
          }
      }

    return (
        <div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || initialCenter}
        zoom={1}
        onLoad={onLoad}
        unMount={unMount}>
            <Autocomplete onLoad={autocompleteOnLoad} onPlaceChanged={onPlaceChanged}>
                <input type="text" placeholder="Enter your city here"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                  }}/>
            </Autocomplete>
        </GoogleMap>
        </div>
    )
}

export default memo(GoogleMapSignUpForm);