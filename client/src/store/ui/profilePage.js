const ABOUT_ON = 'ui/ABOUT_ON';
const RECORDINGS_ON = 'ui/RECORDINGS_ON';
const TOGGLE_RECORDING_MODAL = 'ui/TOGGLE_RECORDING_MODAL';
const ABOUT_OVERVIEW_ON = 'ui/ABOUT_OVERVIEW_ON';
const ABOUT_BIO_ON = 'ui/ABOUT_BIO_ON';
const TOGGLE_OVERVIEW_MODAL = 'ui/TOGGLE_OVERVIEW_MODAL';

export const aboutOn = () => {
    return {
        type: ABOUT_ON
    }
}

export const recordingsOn = () => {
    return {
        type: RECORDINGS_ON
    }
}

export const toggleRecordingModal = () => {
    return {
        type: TOGGLE_RECORDING_MODAL
    }
}

export const aboutOverviewOn = () => {
    return {
        type: ABOUT_OVERVIEW_ON
    }
}

export const aboutBiographyOn = () => {
    return {
        type: ABOUT_BIO_ON
    }
}

export const toggleOverviewModal = () => {
    return {
        type: TOGGLE_OVERVIEW_MODAL
    }
}

const initialProfilePageUIState = {
    about: {
        display: true,
        overview: true,
        biography: false
    },
    recordings: false,
    recordingFormModal: false,
    overviewFormModal: {
        display: false,
        instrumentDropdown: false,
        styleDropdown: false
    }
}

export default function profilePageReducer(state = initialProfilePageUIState, action) {
    const newState = Object.assign({}, state);
    let newAbout = Object.assign({}, newState.about);
    let newOverviewModal = Object.assign({}, newState.overviewFormModal)
    switch (action.type) {
        case ABOUT_ON:
            newState.recordings = false;
            newAbout.display = true;
            newAbout.overview = true;
            newAbout.biography = false;
            newState.about = newAbout;
            return newState;
        case RECORDINGS_ON:
            newAbout.display = false;
            newAbout.overview = true;
            newAbout.biography = false;
            newState.about = newAbout;
            newState.recordings = true;
            return newState;
        case TOGGLE_RECORDING_MODAL:
            newState.recordingFormModal = !newState.recordingFormModal;
            return newState;
        case ABOUT_OVERVIEW_ON:
            newAbout.display = true;
            newAbout.overview = true;
            newAbout.biography = false;
            newState.about = newAbout;
            return newState;
        case ABOUT_BIO_ON:
            newAbout.display = true;
            newAbout.overview = false;
            newAbout.biography = true;
            newState.about = newAbout;
            return newState;
        case TOGGLE_OVERVIEW_MODAL:
            newOverviewModal.display = !newOverviewModal.display;
            newState.overviewFormModal = newOverviewModal;
            return newState;
        default:
            return state;
    }
}