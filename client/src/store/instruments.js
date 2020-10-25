const SET_INSTRUMENTS = 'instruments/SET_INSTRUMENTS';

export const addInstruments = (instruments) => {
    return {
        type: SET_INSTRUMENTS,
        instruments
    }
}

export default function instrumentReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case SET_INSTRUMENTS:
            for (const instrument of action.instruments) {
                newState[instrument.id] = instrument;
            }
            return newState;
        default:
            return state;
    }
}