const SET_RECORDINGS = 'recordings/SET_RECORDINGS';

export const addRecordings = (recordings) => {
    return {
        type: SET_RECORDINGS,
        recordings
    }
}

export default function recordingReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case SET_RECORDINGS:
            for (const recording of action.recordings) {
                newState[recording.id] = recording;
            }
            return newState;
        default:
            return state;
    }
}