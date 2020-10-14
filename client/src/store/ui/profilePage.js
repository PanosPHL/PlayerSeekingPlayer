const TOGGLE_ABOUT = 'ui/TOGGLE_ABOUT';
const TOGGLE_RECORDINGS = 'ui/TOGGLE_RECORDINGS';

const initialProfilePageUIState = {
    about: true,
    recordings: false
}

export default function profilePageReducer(state = initialProfilePageUIState, action) {
    switch(action.type) {
        default:
            return state;
    }
}