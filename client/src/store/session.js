const LOGIN = 'session/LOGIN'

const addUserToSession = (userId) => {
    return {
        type: LOGIN,
        userId
    }
}

// export const login = (email, password)


const initialSessionState = {
    userId: null
};

export default function sessionReducer(state = initialSessionState, action) {
    switch(action.type) {
        default:
            return state;
    }
}