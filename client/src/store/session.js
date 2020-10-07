const initialSessionState = {
    userId: null
};

export default function sessionReducer(state = initialSessionState, action) {
    switch(action.type) {
        default:
            return state;
    }
}