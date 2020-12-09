const TOGGLE_NEW_BAND_MODAL = 'ui/myBands/TOGGLE_NEW_BAND_MODAL';
const TOGGLE_SIDEBAR_BAND_LIST = 'ui/myBands/TOGGLE_SIDEBAR_BAND_LIST';
const TOGGLE_EDIT_BAND_MODAL = 'ui/myBands/TOGGLE_EDIT_BAND_MODAL';

export const toggleSidebarBandList = () => {
    return {
        type: TOGGLE_SIDEBAR_BAND_LIST
    }
}

export const toggleNewBandModal = () => {
    return {
        type: TOGGLE_NEW_BAND_MODAL
    }
}

export const toggleEditBandModal = () => {
    return {
        type: TOGGLE_EDIT_BAND_MODAL
    }
}

const initialMyBandsState = {
    editBandModal: false,
    newBandModal: false,
    sidebarBandList: true
}

export default function bandReducer(state = initialMyBandsState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case TOGGLE_NEW_BAND_MODAL:
            newState.newBandModal = !newState.newBandModal;
            return newState;
        case TOGGLE_SIDEBAR_BAND_LIST:
            newState.sidebarBandList = !newState.sidebarBandList;
            return newState;
        case TOGGLE_EDIT_BAND_MODAL:
            newState.editBandModal = !newState.editBandModal;
            return newState;
        default:
            return state;
    }
}