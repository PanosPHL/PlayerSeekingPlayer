import Cookie from 'js-cookie';
import { addInvitation, deleteInvitation } from './invitations';
import { ACCEPT_INVITATION, DECLINE_INVITATION, DELETE_INVITATION } from './invitations';

const ADD_BAND = 'bands/ADD_BAND';
const SET_BANDS = 'bands/SET_BANDS';
export const ADD_USER_TO_BAND = 'bands/ADD_USER_TO_BAND';
const DELETE_BAND = 'bands/DELETE_BAND';
const REMOVE_USER_FROM_BAND = 'bands/REMOVE_USER_FROM_BAND';
const UPDATE_BAND_INFO = 'bands/UPDATE_BAND_INFO';

const updateBandInfo = (band) => {
    return {
        type: UPDATE_BAND_INFO,
        band
    }
}

const removeUserFromBand = (userId, bandId, confirmed) => {
    return {
        type: REMOVE_USER_FROM_BAND,
        userId,
        bandId,
        confirmed
    }
}

const deleteBand = (bandId) => {
    return {
        type: DELETE_BAND,
        bandId
    }
}

const addUserToBand = ({ userId, bandId }) => {
    return {
        type: ADD_USER_TO_BAND,
        userId,
        bandId
    }
}

const addBand = (band) => {
    return {
        type: ADD_BAND,
        band
    }
}

export const setBands = (bands) => {
    return {
        type: SET_BANDS,
        bands
    }
}

export const postAndAddBand = (name, isPublic = true, owner, style) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch('/api/bands/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ name, isPublic, owner, style, csrfToken })
        });

        res.data = await res.json();
        if (res.ok) {
            dispatch(addBand(res.data.band));
        }

        return res;
    }
}

export const putAndAddMember = (senderId, recipientId, bandId, message) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch(`/api/bands/${bandId}/add_member/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ sender_id: senderId, recipient_id: recipientId, band_id: bandId, message, csrfToken})
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUserToBand(res.data.userBand));
            dispatch(addInvitation(res.data.invitation));
        }

        return res;
    }
}

export const delBand = (bandId) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch(`/api/bands/${bandId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(deleteBand(res.data.bandId));
        }

        return res;
    }
}

export const fetchAndDeleteMember = (bandId, memberId, confirmed) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch(`/api/bands/${bandId}/remove_member/${memberId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(removeUserFromBand(memberId, bandId, confirmed))

            if (res.data.invitation) {
                dispatch(deleteInvitation(res.data.invitation));
            }
        }
    }
}

export const putAndUpdateBandInfo = (bandId, name, styleId, owner) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch(`/api/bands/${bandId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ name, style: styleId, csrfToken, owner, isPublic: true })
        });

        res.data = await res.json();

        if (res.ok){
            dispatch(updateBandInfo(res.data.band));
        }
        return res;
    }
}

export default function bandReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    let slice;
    let newBand;
    switch(action.type) {
        case SET_BANDS:
            for (const band of action.bands) {
                newState[band.id] = band;
            }
            return newState;
        case ADD_BAND:
            newState[action.band.id] = action.band;
            return newState;
        case ADD_USER_TO_BAND:
            newBand = Object.assign({}, newState[action.bandId]);
            newBand.pendingMembers = [...newBand.pendingMembers, Number(action.userId)];
            newState[newBand.id] = newBand;
            return newState;
        case ACCEPT_INVITATION:
            newBand = Object.assign({}, newState[action.bandId]);
            slice = newBand.pendingMembers.indexOf(action.userId);
            newBand.pendingMembers = [...newBand.pendingMembers.slice(0, slice), ...newBand.pendingMembers.slice(slice + 1)];
            newBand.members = [...newBand.members, Number(action.userId)];
            newState[action.bandId] = newBand;

            return newState;
        case DECLINE_INVITATION:
            newBand = Object.assign({}, newState[action.bandId]);
            slice = newBand.pendingMembers.indexOf(action.userId);
            newBand.pendingMembers = [...newBand.pendingMembers.slice(0, slice), ...newBand.pendingMembers.slice(slice + 1)];
            newState[action.bandId] = newBand;

            return newState
        case DELETE_INVITATION:
            if (action.invitation.status === "Pending") {
                newBand = Object.assign({}, newState[action.invitation.bandId]);
                slice = newBand.pendingMembers.indexOf(action.invitation.recipientId);
                newBand.pendingMembers = [...newBand.pendingMembers.slice(0, slice), ...newBand.pendingMembers.slice(slice + 1)];
                newState[action.invitation.bandId] = newBand;
            }
            return newState;
        case DELETE_BAND:
            newBand = Object.assign({}, newState[action.bandId]);
            newBand.isPublic = false;
            newState[action.bandId] = newBand;
            return newState;
        case REMOVE_USER_FROM_BAND:
            newBand = Object.assign({}, newState[action.bandId]);
            if (action.confirmed) {
                slice = newBand.members.indexOf(action.userId);
                newBand.members = [...newBand.members.slice(0, slice), ...newBand.members.slice(slice + 1)];
            } else {
                slice = newBand.pendingMembers.indexOf(action.userId);
                newBand.pendingMembers = [...newBand.pendingMembers.slice(0, slice), ...newBand.pendingMembers.slice(slice + 1)];
            }
            newState[action.bandId] = newBand;
            return newState;
        case UPDATE_BAND_INFO:
            newState[action.band.id] = action.band;
            return newState;
        default:
            return state;
    }
}