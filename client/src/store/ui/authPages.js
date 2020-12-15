const TOGGLE_LEARN_MORE_MODAL = 'ui/authPages/TOGGLE_LEARN_MORE_MODAL';

export const toggleLearnMoreModal = () => {
    return {
        type: TOGGLE_LEARN_MORE_MODAL
    }
}

export const initialAuthPagesUIState = {
    learnMoreModal: false
}

export default function authPagesReducer(state = initialAuthPagesUIState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case TOGGLE_LEARN_MORE_MODAL:
            newState.learnMoreModal = !newState.learnMoreModal;
            return newState;
        default:
            return state;
    }
}