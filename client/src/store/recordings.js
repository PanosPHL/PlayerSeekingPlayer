import Cookie from 'js-cookie';

const ADD_RECORDING = 'recordings/ADD_RECORDING';
const SET_RECORDINGS = 'recordings/SET_RECORDINGS';
export const ADD_PROFILE_RECORDING ='recordings/ADD_PROFILE_RECORDING';
export const UPDATE_PROFILE_RECORDING = 'recordings/UPDATE_PROFILE_RECORDING';
export const DELETE_PROFILE_RECORDING = 'recordings/DELETE_PROFILE_RECORDING';

export const deleteRecording = (recordingId, userId) => {
    return {
        type: DELETE_PROFILE_RECORDING,
        recordingId,
        userId
    }
}

export const addRecording = (recording) => {
    return {
        type: ADD_RECORDING,
        recording
    }
}

export const addProfileRecording = (profileRecording) => {
    return {
        type: ADD_PROFILE_RECORDING,
        profileRecording
    }
}

export const addRecordings = (recordings) => {
    return {
        type: SET_RECORDINGS,
        recordings
    }
}

export const updateProfileRecording = (profileRecording) => {
    return {
        type: UPDATE_PROFILE_RECORDING,
        profileRecording
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


        if (res.ok) {
            dispatch(addRecording(res.data.recording));
            dispatch(addProfileRecording(res.data.profileRecording));
        }

        return res;
    }
}

export const putAndUpdateRecording = (profileId, recordingId, url, title, description) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/recordings/${recordingId}/profiles/${profileId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                url,
                title,
                description
            })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(updateProfileRecording(res.data.profileRecording));
        }

        return res;
    }
}

export const removeRecording = (recordingId, profileId) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/recordings/${recordingId}/profile/${profileId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        res.data = await res.json();
        console.log(res);
        if (res.ok) {
            const { recordingId, profileId } = res.data;
            dispatch(deleteRecording(recordingId, profileId));
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
        case ADD_RECORDING:
            newState[action.recording.id] = action.recording;
            return newState;
        default:
            return state;
    }
}