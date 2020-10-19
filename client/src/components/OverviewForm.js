import React, { useReducer } from 'react';
import Datepicker from 'react-datepicker';
import OverviewFormContext from '../contexts/OverviewFormContext';
import InstrumentDropdown from './InstrumentDropdown';

const SET_DOB = 'SET_DOB';
const ADD_INSTRUMENT = 'ADD_INSTRUMENT';
const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';

const OverviewForm = ({ initDOB, instruments }) => {

    const initialState = {
        DOB: new Date(initDOB),
        instruments: []
    }

    function overviewReducer(state, action) {
        const newState = Object.assign({}, state);
        switch (action.type) {
            case SET_DOB:
                newState.DOB = action.DOB;
                return newState;
            case ADD_INSTRUMENT:
                newState.instruments = [...newState.instruments, action.instrumentId]
                return newState;
            case REMOVE_INSTRUMENT:
                const slicePoint = newState.instruments.indexOf(action.instrumentId)
                newState.instruments = [...newState.instruments.slice(0, slicePoint), ...newState.instruments.slice(slicePoint + 1)];
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

    const value = {
        onInstrumentChange
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
                    <label>Instruments ⯆</label>
                </p>
                <InstrumentDropdown instruments={instruments} />
            </div>
        </form>
        </OverviewFormContext.Provider>
    )
}

export default OverviewForm;