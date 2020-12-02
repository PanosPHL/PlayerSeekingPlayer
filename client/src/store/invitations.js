import Cookie from 'js-cookie';

import { setActiveInvitation } from '../store/session';

const ADD_INVITATIONS = 'invitations/ADD_INVITATIONS';
export const ADD_INVITATION = 'invitations/ADD_INVITATION';
export const DELETE_INVITATION = 'invitations/DELETE_INVITATION';

export const addInvitation = (invitation) => {
    return {
        type: ADD_INVITATION,
        invitation
    }
}

export const addInvitations = (invitations) => {
    return {
        type: ADD_INVITATIONS,
        invitations
    }
}

export const deleteInvitation = (invitation) => {
    return {
        type: DELETE_INVITATION,
        invitation
    }
}

export const fetchAndDeleteInvitation = (invitationId) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/invitations/${invitationId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        res.data = await res.json();
        console.log(res);
        if (res.ok) {
            dispatch(setActiveInvitation(null));
            dispatch(deleteInvitation(res.data.invitation));
        }
    }
}

export default function invitationReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case ADD_INVITATIONS:
            for (const invitation of action.invitations) {
                newState[invitation.id] = invitation;
            }
            return newState;
        case ADD_INVITATION:
            newState[action.invitation.id] = action.invitation;
            return newState;
        case DELETE_INVITATION:
            delete newState[action.invitation.id];
            return newState;
        default:
            return state;
    }
}