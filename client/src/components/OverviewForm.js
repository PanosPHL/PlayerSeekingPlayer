import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Datepicker from 'react-datepicker';
import OverviewFormContext from '../contexts/OverviewFormContext';
import GoogleMapOverviewForm from './GoogleMapOverviewForm';
import InstrumentDropdown from './InstrumentDropdown';
import StylesDropdown from './StylesDropdown';
import { toggleInstrumentDropdown, toggleStyleDropdown, toggleOverviewModal } from '../store/ui/profilePage';
import { putAndUpdateOverview } from '../store/users';
import { setErrors, clearErrors } from '../store/errors';
import aboutStyles from '../css-modules/About.module.css';

const SET_DOB = 'SET_DOB';
const ADD_INSTRUMENT = 'ADD_INSTRUMENT';
const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
const ADD_STYLE = 'ADD_STYLE';
const REMOVE_STYLE = 'REMOVE_STYLE';
const SET_LOCATION = 'SET_LOCATION';
const UNSET_VALID_LOCATION = "UNSET_VALID_LOCATION";

const OverviewForm = ({ initDOB, initLocation, initLat, initLng, instruments, styles, userInstruments, userStyles, userId }) => {

    const initialState = {
        DOB: new Date(initDOB),
        instruments: userInstruments,
        styles: userStyles,
        location: {
            location: initLocation,
            lat: initLat,
            lng: initLng,
            validLocation: initLocation ? true : false
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
                newLocationData.validLocation = true;
                newState.location = newLocationData;
                return newState;
            case UNSET_VALID_LOCATION:
                newLocationData.validLocation = false;
                newState.location = newLocationData;
                return newState;
            default:
                return state;
        }
    }

    const dispatch = useDispatch();
    const [state, localDispatch] = useReducer(overviewReducer, initialState);

    useEffect(() => {
        dispatch(clearErrors());
    }, [state, dispatch]);

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
            state.location.lat, state.location.lng, state.location.validLocation));
        if (res.ok) {
            dispatch(toggleOverviewModal());
            document.body.classList.remove('noscroll');
            return;
        }
        dispatch(setErrors(res.data.errors));
    }

    const styleDropdownClick = () => {
        dispatch(toggleStyleDropdown());
    }

    const instrumentDropdownClick = () => {
        dispatch(toggleInstrumentDropdown());
    }

    const value = {
        actionTypes: {
            ADD_INSTRUMENT,
            REMOVE_INSTRUMENT,
            ADD_STYLE,
            REMOVE_STYLE,
            UNSET_VALID_LOCATION
        },
        onLocationChange,
        localDispatch
    }

    return (
        <OverviewFormContext.Provider value={value}>
            <div className={aboutStyles.overviewFormContainer}>
            <h2 className={aboutStyles.modalFormTitle}>Edit Overview</h2>
        <form className={aboutStyles.overviewForm} method="" action="" onSubmit={handleSubmit}>
            <div className="form-control-group">
            <p>
                <label className="labels">Date of Birth</label>
            </p>
            <Datepicker className="form-control" selected={state.DOB} onChange={date => localDispatch({ type: SET_DOB, DOB: date })} />
            </div>
            <div className={aboutStyles.dropdownContainer}>
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
            <div className={aboutStyles.dropdownContainer}>
                <p style={{position: 'relative'}}>
                    <label className="labels" onClick={styleDropdownClick}>Styles <span
                    className={styleDropdown ? aboutStyles.downStyleTriangle : aboutStyles.rightStyleTriangle}>&#9654;</span></label>
                </p>
                <StylesDropdown
                className={styleDropdown ? aboutStyles.openStyleDropdown : aboutStyles.closedStyleDropdown}
                styles={styles}
                userStyles={userStyles}/>
            </div>
            <div className={"form-control-group" + " " + aboutStyles.mapContainer}>
                <GoogleMapOverviewForm
                initLocation={state.location.location}
                initLat={state.location.lat}
                initLng={state.location.lng}/>
            </div>
            <button className={aboutStyles.overviewSubmitButton} type="submit">Submit</button>
        </form>
            </div>
        </OverviewFormContext.Provider>
    )
}

export default OverviewForm;