import React, { useState, useContext, useCallback, memo } from 'react';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import SignUpContext from '../contexts/SignUpContext';
import styles from '../css-modules/AuthPages.module.css';

const GoogleMapSignUpForm = () => {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [marker, setMarker] = useState(null);
    const [autocomplete, setAutoComplete] = useState(null);
    const {
        handlers: {
            setLocation,
            setLat,
            setLng
        }
    } = useContext(SignUpContext);

    const initialCenter = {
        lat: 44.3148443,
        lng: -85.60236429999999
    }

    const containerStyle = {
        width: '450px',
        height: '465px'
      };

      const onLoad = useCallback((map) => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
          setMap(map);
      }, []);

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
              setLat(newLat);
              setLng(newLng);
              setLocation(document.querySelector('#autocomplete').value);
              setMarker(new window.google.maps.Marker({ position: { lat: newLat, lng: newLng }, map }));
              setCenter({ lat: newLat, lng: newLng });
          } else {
              console.log("Autocomplete is not loaded yet");
          }
      }

    return (
        <div className={styles.mapContainer}>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || initialCenter}
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
                  }}/>
            </Autocomplete>
        </GoogleMap>
        </div>
    )
}

export default memo(GoogleMapSignUpForm);