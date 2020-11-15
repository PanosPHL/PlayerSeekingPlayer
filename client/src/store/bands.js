import { addInvitation } from './invitations';

import Cookie from 'js-cookie';

const ADD_BAND = 'bands/ADD_BAND';
const SET_BANDS = 'bands/SET_BANDS';
export const ADD_USER_TO_BAND = 'bands/ADD_USER_TO_BAND';

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
        console.log(res);
        if (res.ok) {
            dispatch(addBand(res.data.band));
        }

        return res;
    }
}

export const putAndAddMember = (senderId, recipientId, bandId, message) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch(`/api/bands/${bandId}/add_member`, {
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

export default function bandReducer(state = {}, action) {
    const newState = Object.assign({}, state);
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
        default:
            return state;
    }
}