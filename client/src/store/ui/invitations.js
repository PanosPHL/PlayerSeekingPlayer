const TOGGLE_MANAGE_INVITATION_MODAL = 'ui/invitations/TOGGLE_MANAGE_INVITATION_MODAL';

export const toggleManageInvitationModal = () => {
    return {
        type: TOGGLE_MANAGE_INVITATION_MODAL
    }
}

export const initialInvitationUIState = {
    manageInvitationModal: false
}

export default function invitationReducer(state = initialInvitationUIState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case TOGGLE_MANAGE_INVITATION_MODAL:
            newState.manageInvitationModal = !newState.manageInvitationModal;
            return newState;
        default:
            return state;
    }
}