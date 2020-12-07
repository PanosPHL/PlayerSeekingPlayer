import { addUsers } from './users';
import { addInstruments } from './instruments';
import { addRecordings } from './recordings';
import { addStyles } from './styles';
import { setBands } from './bands';
import { addInvitations } from './invitations';

import Cookie from 'js-cookie';

const LOGIN = 'session/LOGIN';
export const LOGOUT = 'session/LOGOUT';
const SET_RECORDING_FORM_ID = 'session/SET_RECORDING_FORM_ID';
const SET_SEARCH_RESULTS = 'session/SEARCH_RESULTS';
const RECEIVED_INVITATION_TYPE = 'session/RECEIVED_INVITATION_TYPE';
const SENT_INVITATION_TYPE = 'session/SENT_INVITATION_TYPE';
const SET_ACTIVE_INVITATION = 'session/SET_ACTIVE_INVITATION';
const SET_BAND_FORM_ID = 'session/SET_BAND_FORM_ID';

export const setBandFormId = (bandId) => {
    return {
        type: SET_BAND_FORM_ID,
        bandId
    }
}

export const setActiveInvitation = (invitationId) => {
    return {
        type: SET_ACTIVE_INVITATION,
        invitationId
    }
}

export const changeInvitationType = (invType) => {
    return {
        type: invType === 'received' ? RECEIVED_INVITATION_TYPE : SENT_INVITATION_TYPE,
    }
}

const addUserToSession = (userId) => {
    return {
        type: LOGIN,
        userId
    }
}

const removeUserFromSession = () => {
    return {
        type: LOGOUT
    }
}

export const setRecordingFormId = (id) => {
    return {
        type: SET_RECORDING_FORM_ID,
        id
    }
}

const setSearchResults = (searchResults) => {
    return {
        type: SET_SEARCH_RESULTS,
        searchResults
    }
}

export const login = (email, password) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch('/api/session/login', {
            method: "PUT",
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUserToSession(res.data["id"]));
        }
        return res;
    }
}

export const logout = () => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch('/api/session/logout', {
            method: 'PUT',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            dispatch(removeUserFromSession());
        }

        return res;
    }
}

export const getSessionData = () => {
    return async dispatch => {
        const res = await fetch('/api/session/data');

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUsers(res.data.users));
            dispatch(addInstruments(res.data.instruments));
            dispatch(addRecordings(res.data.recordings));
            dispatch(addStyles(res.data.styles));
            dispatch(setBands(res.data.bands));
            dispatch(addInvitations(res.data.invitations));
        }

        return res;
    }
}

export const search = (firstName, lastName, radius, instruments, styles, userId) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/session/search`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ firstName, lastName, radius, instruments, styles, userId, csrfToken })
        });

        res.data = await res.json();
        console.log(res);
        if (res.ok) {
            dispatch(setSearchResults(res.data.searchResults));
        }

        return res;
    }
}

const initialSessionState = {
    userId: null,
    recordingFormId: null,
    searchResults: [],
    invitationType: 'received',
    activeInvitation: null,
    bandFormId: null
};

export default function sessionReducer(state = initialSessionState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case LOGIN:
            newState.userId = action.userId;
            return newState;
        case LOGOUT:
            newState.userId = null;
            return newState;
        case SET_RECORDING_FORM_ID:
            newState.recordingFormId = action.id;
            return newState;
        case SET_SEARCH_RESULTS:
            newState.searchResults = action.searchResults;
            return newState;
        case RECEIVED_INVITATION_TYPE:
            newState.invitationType = 'received';
            return newState;
        case SENT_INVITATION_TYPE:
            newState.invitationType = 'sent';
            return newState;
        case SET_ACTIVE_INVITATION:
            newState.activeInvitation = action.invitationId;
            return newState;
        case SET_BAND_FORM_ID:
            newState.bandFormId = action.bandId;
            return newState;
        default:
            return state;
    }
}