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