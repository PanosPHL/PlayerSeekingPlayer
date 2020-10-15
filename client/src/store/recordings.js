import Cookie from 'js-cookie';

const ADD_RECORDING = 'recordings/ADD_RECORDING';
const SET_RECORDINGS = 'recordings/SET_RECORDINGS';

export const addRecording = (recording) => {
    return {
        type: ADD_RECORDING,
        recording
    }
}

export const addRecordings = (recordings) => {
    return {
        type: SET_RECORDINGS,
        recordings
    }
}

export const postAndAddRecording = (profileId, url, title, description) => {
    const csrfToken = Cookie.get('XSRF-TOKEN')
    return async dispatch => {
        const res = await fetch('/api/recordings/', {
            method: "POST",
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                profileId,
                url,
                title,
                description
            })
        });

        res.data = await res.json();

        console.log(res);
        if (res.ok) {
            // dispatch(addRecording(res.data))
        }

        return res;
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