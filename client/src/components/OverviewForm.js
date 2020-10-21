import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Datepicker from 'react-datepicker';
import OverviewFormContext from '../contexts/OverviewFormContext';
import GoogleMapOverviewForm from './GoogleMapOverviewForm';
import InstrumentDropdown from './InstrumentDropdown';
import StylesDropdown from './StylesDropdown';
import { toggleInstrumentDropdown, toggleStyleDropdown } from '../store/ui/profilePage';
import { putAndUpdateOverview } from '../store/users';
import aboutStyles from '../css-modules/About.module.css';

const SET_DOB = 'SET_DOB';
const ADD_INSTRUMENT = 'ADD_INSTRUMENT';
const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
const ADD_STYLE = 'ADD_STYLE';
const REMOVE_STYLE = 'REMOVE_STYLE';
const SET_LOCATION = 'SET_LOCATION';

const OverviewForm = ({ initDOB, initLocation, initLat, initLng, instruments, styles, userInstruments, userStyles, userId }) => {

    const initialState = {
        DOB: new Date(initDOB),
        instruments: userInstruments,
        styles: userStyles,
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
                newState.DOB = new Date(action.DOB);
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

    const dispatch = useDispatch();
    const [state, localDispatch] = useReducer(overviewReducer, initialState);

    const { instrumentDropdown, styleDropdown } = useSelector(state => state.ui.profilePage.overviewFormModal)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(putAndUpdateOverview(userId, state.DOB,
            state.instruments, state.styles, state.location.location,
            state.location.lat, state.location.lng));
        return res;
    }

    const styleDropdownClick = () => {
        dispatch(toggleStyleDropdown());
    }

    const instrumentDropdownClick = () => {
        dispatch(toggleInstrumentDropdown());
    }

    const value = {
        onInstrumentChange,
        onStyleChange,
        onLocationChange,
    }

    return (
        <OverviewFormContext.Provider value={value}>
            <h2>Edit Overview</h2>
        <form method="" action="" onSubmit={handleSubmit}>
            <p>
                <label className="labels">Date of Birth</label>
            </p>
            <Datepicker className="form-control" selected={state.DOB} onChange={date => localDispatch({ type: SET_DOB, DOB: date })} />
            <div>
                <p style={{position: 'relative'}}>
                    <label className="labels" onClick={instrumentDropdownClick}>Instruments <span
                    className={instrumentDropdown ? aboutStyles.downInstrumentTriangle : aboutStyles.rightInstrumentTriangle}>&#9654;</span>
                    </label>
                </p>
                <InstrumentDropdown
                className={instrumentDropdown ? aboutStyles.openInstrumentDropdown : aboutStyles.closedInstrumentDropdown}
                instruments={instruments}
                userInstruments={userInstruments}/>
            </div>
            <div>
                <p style={{position: 'relative'}}>
                    <label className="labels" onClick={styleDropdownClick}>Styles <span
                    className={styleDropdown ? aboutStyles.downStyleTriangle : aboutStyles.rightStyleTriangle}>&#9654;</span></label>
                </p>
                <StylesDropdown
                className={styleDropdown ? aboutStyles.openStyleDropdown : aboutStyles.closedStyleDropdown}
                styles={styles}
                userStyles={userStyles}/>
            </div>
            <div>
                <GoogleMapOverviewForm
                initLocation={state.location.location}
                initLat={state.location.lat}
                initLng={state.location.lng}/>
            </div>
            <button type="submit">Submit</button>
        </form>
        </OverviewFormContext.Provider>
    )
}

export default OverviewForm;