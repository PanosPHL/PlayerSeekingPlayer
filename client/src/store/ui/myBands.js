const TOGGLE_NEW_BAND_MODAL = 'ui/myBands/TOGGLE_NEW_BAND_MODAL';

export const toggleNewBandModal = () => {
    return {
        type: TOGGLE_NEW_BAND_MODAL
    }
}

const initialMyBandsState = {
    newBandModal: false
}

export default function bandReducer(state = initialMyBandsState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case TOGGLE_NEW_BAND_MODAL:
            newState.newBandModal = !newState.newBandModal;
            return newState;
        default:
            return state;
    }
}