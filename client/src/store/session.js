import Cookie from 'js-cookie';
const csrfToken = Cookie.get('XSRF-TOKEN');

const LOGIN = 'session/LOGIN'

const addUserToSession = (userId) => {
    return {
        type: LOGIN,
        userId
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const res = await fetch('/api/session/login', {
            method: "PUT",
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUserToSession(res.data["id"]));
        }
        return res;
    }
}


const initialSessionState = {
    userId: null
};

export default function sessionReducer(state = initialSessionState, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case LOGIN:
            newState.userId = action.userId;
            return newState;
        default:
            return state;
    }
}