const ABOUT_ON = 'ui/ABOUT_ON';
const RECORDINGS_ON = 'ui/RECORDINGS_ON';
const TOGGLE_RECORDING_MODAL = 'ui/TOGGLE_RECORDING_MODAL';
const ABOUT_OVERVIEW_ON = 'ui/ABOUT_OVERVIEW_ON';
const ABOUT_BIO_ON = 'ui/ABOUT_BIO_ON';
const TOGGLE_OVERVIEW_MODAL = 'ui/TOGGLE_OVERVIEW_MODAL';
const TOGGLE_INSTRUMENT_DROPDOWN = 'ui/TOGGLE_INSTRUMENT_DROPDOWN';
const TOGGLE_STYLE_DROPDOWN = 'ui/TOGGLE_STYLE_DROPDOWN';
const TOGGLE_BIO_MODAL = 'ui/TOGGLE_BIO_MODAL';
const TOGGLE_PROFILE_PICTURE_BUTTON = 'ui/TOGGLE_PROFILE_PICTURE_BUTTON';
const TOGGLE_PROFILE_PICTURE_FORM = 'ui/TOGGLE_PROFILE_PICTURE_FORM';

export const toggleProfilePicForm = () => {
    return {
        type: TOGGLE_PROFILE_PICTURE_FORM
    }
}


export const toggleProfilePicButton = () => {
    return {
        type: TOGGLE_PROFILE_PICTURE_BUTTON
    }
}

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

export const toggleInstrumentDropdown = () => {
    return {
        type: TOGGLE_INSTRUMENT_DROPDOWN
    }
}

export const toggleStyleDropdown = () => {
    return {
        type: TOGGLE_STYLE_DROPDOWN
    }
}

export const toggleBioModal = () => {
    return {
        type: TOGGLE_BIO_MODAL
    }
}

const initialProfilePageUIState = {
    about: {
        display: true,
        overview: true,
        biography: false
    },
    bioModal: false,
    recordings: false,
    recordingFormModal: false,
    overviewFormModal: {
        display: false,
        instrumentDropdown: false,
        styleDropdown: false
    },
    pictures: {
        profilePicButton: false,
        profilePicModal: false,
        coverPhotoButton: false,
        coverPhotoModal: false
    }
}

export default function profilePageReducer(state = initialProfilePageUIState, action) {
    const newState = Object.assign({}, state);
    let newAbout;
    let newOverviewModal;
    let newPictures;
    switch (action.type) {
        case ABOUT_ON:
            newAbout = Object.assign({}, newState.about);
            newState.recordings = false;
            newAbout.display = true;
            newAbout.overview = true;
            newAbout.biography = false;
            newState.about = newAbout;
            return newState;
        case RECORDINGS_ON:
            newAbout = Object.assign({}, newState.about);
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
            newAbout = Object.assign({}, newState.about);
            newAbout.display = true;
            newAbout.overview = true;
            newAbout.biography = false;
            newState.about = newAbout;
            return newState;
        case ABOUT_BIO_ON:
            newAbout = Object.assign({}, newState.about);
            newAbout.display = true;
            newAbout.overview = false;
            newAbout.biography = true;
            newState.about = newAbout;
            return newState;
        case TOGGLE_OVERVIEW_MODAL:
            newOverviewModal = Object.assign({}, newState.overviewFormModal);
            newOverviewModal.display = !newOverviewModal.display;
            newState.overviewFormModal = newOverviewModal;
            return newState;
        case TOGGLE_INSTRUMENT_DROPDOWN:
            newOverviewModal = Object.assign({}, newState.overviewFormModal);
            newOverviewModal.instrumentDropdown = !newOverviewModal.instrumentDropdown;
            newState.overviewFormModal = newOverviewModal;
            return newState;
        case TOGGLE_STYLE_DROPDOWN:
            newOverviewModal = Object.assign({}, newState.overviewFormModal);
            newOverviewModal.styleDropdown = !newOverviewModal.styleDropdown;
            newState.overviewFormModal = newOverviewModal;
            return newState;
        case TOGGLE_BIO_MODAL:
            newState.bioModal = !newState.bioModal;
            return newState;
        case TOGGLE_PROFILE_PICTURE_BUTTON:
            newPictures = Object.assign({}, newState.pictures);
            newPictures.profilePicButton = !newPictures.profilePicButton;
            newState.pictures = newPictures;
            return newState;
        case TOGGLE_PROFILE_PICTURE_FORM:
            newPictures = Object.assign({}, newState.pictures);
            newPictures.profilePicModal = !newPictures.profilePicModal;
            newState.pictures = newPictures;
            return newState;
        default:
            return state;
    }
}