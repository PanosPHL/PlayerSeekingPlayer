import Cookie from 'js-cookie';

const SIGNUP_USER = 'users/SIGNUP_USER';

const addUser = (user) => {
    return {
        type: SIGNUP_USER,
        user
    }
}

export const signup = (firstName, lastName, email, dateOfBirth, location) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch('/api/users/', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ firstName, lastName, email, dateOfBirth: dateOfBirth.toISOString().split('T')[0], location, csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUser(res.data));
        }

        return res;
    }
}

export default function usersReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case SIGNUP_USER:
            newState[action.user.id] = action.user;
            return newState;
        default:
            return state;
    }
}