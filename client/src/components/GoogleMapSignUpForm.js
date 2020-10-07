import React, { useState, useContext, useCallback, memo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import GoogleMapsContext from '../contexts/GoogleMapsContext';

const GoogleMapSignUpForm = ({ apiKey }) => {
    const [map, setMap] = useState(null);

    const containerStyle = {
        width: '400px',
        height: '400px'
      };

      const center = {
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

    return (
        <div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        unMount={unMount}>

        </GoogleMap>
        </div>
    )
}

export default memo(GoogleMapSignUpForm);