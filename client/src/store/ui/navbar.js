const TOGGLE_PROFILE_DROPDOWN = 'ui/TOGGLE_PROFILE_DROPDOWN';
const TOGGLE_SEARCH_DROPDOWN = 'ui/TOGGLE_SEARCH_DROPDOWN';
const TOGGLE_SEARCH_INSTRUMENT_DROPDOWN = 'ui/TOGGLE_SEARCH_INSTRUMENT_DROPDOWN';
const TOGGLE_SEARCH_STYLE_DROPDOWN = 'ui/TOGGLE_SEARCH_STYLE_DROPDOWN';

export const toggleSearchInstrumentDropdown = () => {
    return {
        type: TOGGLE_SEARCH_INSTRUMENT_DROPDOWN
    }
}

export const toggleSearchStyleDropdown = () => {
    return {
        type: TOGGLE_SEARCH_STYLE_DROPDOWN
    }
}

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
    searchDropdown: {
        display: false,
        instrumentDropdown: false,
        styleDropdown: false
    }
}

export default function navbarReducer(state = initialNavbarUIState, action) {
    const newState = Object.assign({}, state);
    let newSearchDropdown = Object.assign({}, state.searchDropdown)
    switch (action.type) {
        case TOGGLE_PROFILE_DROPDOWN:
            newState.profileDropdown = !newState.profileDropdown;
            return newState;
        case TOGGLE_SEARCH_DROPDOWN:
            newSearchDropdown.display = !newSearchDropdown.display;
            newState.searchDropdown = newSearchDropdown
            return newState;
        case TOGGLE_SEARCH_INSTRUMENT_DROPDOWN:
            newSearchDropdown.instrumentDropdown = !newSearchDropdown.instrumentDropdown;
            newState.searchDropdown = newSearchDropdown;
            return newState;
        case TOGGLE_SEARCH_STYLE_DROPDOWN:
            newSearchDropdown.styleDropdown = !newSearchDropdown.styleDropdown;
            newState.searchDropdown = newSearchDropdown;
            return newState;
        default:
            return state;
    }
}