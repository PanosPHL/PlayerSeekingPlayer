const ADD_INVITATIONS = 'invitations/ADD_INVITATIONS';
export const ADD_INVITATION = 'invitations/ADD_INVITATION';

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
        default:
            return state;
    }
}