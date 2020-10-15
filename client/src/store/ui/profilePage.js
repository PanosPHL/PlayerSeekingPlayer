const ABOUT_ON = 'ui/ABOUT_ON';
const RECORDINGS_ON = 'ui/RECORDINGS_ON';
const TOGGLE_RECORDING_MODAL = 'ui/TOGGLE_RECORDING_MODAL';

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

export const toggleRecordingModal = (id) => {
    return {
        type: TOGGLE_RECORDING_MODAL,
        id
    }
}

const initialProfilePageUIState = {
    about: true,
    recordings: false,
    recordingFormModal: false
}

export default function profilePageReducer(state = initialProfilePageUIState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case ABOUT_ON:
            newState.recordings = false;
            newState.about = true;
            return newState;
        case RECORDINGS_ON:
            newState.about = false;
            newState.recordings = true;
            return newState;
        case TOGGLE_RECORDING_MODAL:
            newState.recordingFormModal = !newState.recordingFormModal;
            return newState;
        default:
            return state;
    }
}