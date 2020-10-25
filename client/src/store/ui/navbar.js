const TOGGLE_PROFILE_DROPDOWN = 'ui/TOGGLE_PROFILE_DROPDOWN';

export const toggleProfileDropdown = () => {
    return {
        type: TOGGLE_PROFILE_DROPDOWN
    }
}

const initialNavbarUIState = {
    profileDropdown: false
}

export default function navbarReducer(state = initialNavbarUIState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case TOGGLE_PROFILE_DROPDOWN:
            newState.profileDropdown = !newState.profileDropdown;
            return newState;
        default:
            return state;
    }
}