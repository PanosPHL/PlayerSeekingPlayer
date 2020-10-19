import React, { useReducer } from 'react';
import Datepicker from 'react-datepicker';
import OverviewFormContext from '../contexts/OverviewFormContext';
import GoogleMapOverviewForm from './GoogleMapOverviewForm';
import InstrumentDropdown from './InstrumentDropdown';
import StylesDropdown from './StylesDropdown';

const SET_DOB = 'SET_DOB';
const ADD_INSTRUMENT = 'ADD_INSTRUMENT';
const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
const ADD_STYLE = 'ADD_STYLE';
const REMOVE_STYLE = 'REMOVE_STYLE';
const SET_LOCATION = 'SET_LOCATION';

const OverviewForm = ({ initDOB, initLocation, initLat, initLng, instruments, styles }) => {

    const initialState = {
        DOB: new Date(initDOB),
        instruments: [],
        styles: [],
        location: {
            location: initLocation,
            lat: initLat,
            lng: initLng
        }
    }

    function overviewReducer(state, action) {
        const newState = Object.assign({}, state);
        const newLocationData = Object.assign({}, newState.location);
        let slicePoint;
        switch (action.type) {
            case SET_DOB:
                newState.DOB = action.DOB;
                return newState;
            case ADD_INSTRUMENT:
                newState.instruments = [...newState.instruments, action.instrumentId]
                return newState;
            case REMOVE_INSTRUMENT:
                slicePoint = newState.instruments.indexOf(action.instrumentId)
                newState.instruments = [...newState.instruments.slice(0, slicePoint), ...newState.instruments.slice(slicePoint + 1)];
                return newState;
            case ADD_STYLE:
                newState.styles = [...newState.styles, action.styleId];
                return newState;
            case REMOVE_STYLE:
                slicePoint = newState.styles.indexOf(action.styleId);
                newState.styles = [...newState.styles.slice(0, slicePoint), ...newState.styles.slice(slicePoint + 1)];
                return newState;
            case SET_LOCATION:
                const { location: newLocation, lat: newLat, lng: newLng } = action;
                newLocationData.location = newLocation;
                newLocationData.lat = newLat;
                newLocationData.lng = newLng;
                newState.location = newLocationData;
                return newState;
            default:
                return state;
        }
    }

    const [state, localDispatch] = useReducer(overviewReducer, initialState);

    const onInstrumentChange = (e) => {
        if (e.target.checked) {
            localDispatch({ type: ADD_INSTRUMENT, instrumentId: parseInt(e.target.value) });
        } else {
            localDispatch({ type: REMOVE_INSTRUMENT, instrumentId: parseInt(e.target.value) });
        }
    }

    const onStyleChange = (e) => {
        if (e.target.checked) {
            localDispatch({ type: ADD_STYLE, styleId: parseInt(e.target.value) });
        } else {
            localDispatch({ type: REMOVE_STYLE, styleId: parseInt(e.target.value) });
        }
    }

    const onLocationChange = (location, lat, lng) => {
        localDispatch({
            type: SET_LOCATION,
            location,
            lat,
            lng
        });
    }

    const value = {
        onInstrumentChange,
        onStyleChange,
        onLocationChange
    }

    return (
        <OverviewFormContext.Provider value={value}>
        <form method="" action="">
            <p>
                <label>Date of Birth</label>
            </p>
            <Datepicker selected={state.DOB} onChange={date => localDispatch({ type: SET_DOB, DOB: new Date(date) })} />
            <div>
                <p>
                    <label>Instruments <span>&#9654;</span></label>
                </p>
                <InstrumentDropdown instruments={instruments} />
            </div>
            <div>
                <p>
                    <label>Styles <span>&#9654;</span></label>
                </p>
                <StylesDropdown styles={styles} />
            </div>
            <div>
                <GoogleMapOverviewForm
                initLocation={state.location.location}
                initLat={state.location.lat}
                initLng={state.location.lng}/>
            </div>
        </form>
        </OverviewFormContext.Provider>
    )
}

export default OverviewForm;