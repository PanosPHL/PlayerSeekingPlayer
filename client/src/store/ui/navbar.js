const TOGGLE_PROFILE_DROPDOWN = 'ui/TOGGLE_PROFILE_DROPDOWN';
const TOGGLE_SEARCH_DROPDOWN = 'ui/TOGGLE_SEARCH_DROPDOWN';

export const toggleSearchDropdown = () => {
    return {
        type: TOGGLE_SEARCH_DROPDOWN
    }
}

export const toggleProfileDropdown = () => {
    return {
        type: TOGGLE_PROFILE_DROPDOWN
    }
}

const initialNavbarUIState = {
    profileDropdown: false,
    searchDropdown: false
}

export default function navbarReducer(state = initialNavbarUIState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case TOGGLE_PROFILE_DROPDOWN:
            newState.profileDropdown = !newState.profileDropdown;
            return newState;
        case TOGGLE_SEARCH_DROPDOWN:
            newState.searchDropdown = !newState.searchDropdown;
            return newState;
        default:
            return state;
    }
}