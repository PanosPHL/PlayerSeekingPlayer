import React, { useState, useContext, useCallback, memo } from 'react';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import SignUpContext from '../contexts/SignUpContext';

const GoogleMapSignUpForm = ({ apiKey }) => {
    const [map, setMap] = useState(null);
    const [residence, setResidence] = useState('')
    const [autocomplete, setAutoComplete] = useState(null);
    const {
        handlers: {
            setLocation
        }
    } = useContext(SignUpContext);

    const containerStyle = {
        width: '400px',
        height: '400px'
      };

      let center = {
        lat: -3.745,
        lng: -38.523
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
              console.log(autocomplete.getPlace());
              setLocation(`${autocomplete.getPlace().geometry.location.lat()}, ${autocomplete.getPlace().geometry.location.lng()}`)
          } else {
              console.log("Autocomplete is not loaded yet");
          }
      }

    return (
        <div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        unMount={unMount}>
            <Autocomplete onLoad={autocompleteOnLoad} onPlaceChanged={onPlaceChanged}>
                <input type="text" placeholder="Enter your city here" value={residence} onChange={(e) => setResidence(e.target.value)}
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