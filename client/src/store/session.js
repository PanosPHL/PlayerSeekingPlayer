import { addUsers } from './users';
import { addInstruments } from './instruments';
import { addRecordings } from './recordings';
import { addStyles } from './styles';

import Cookie from 'js-cookie';
const csrfToken = Cookie.get('XSRF-TOKEN');


const LOGIN = 'session/LOGIN';
export const LOGOUT = 'session/LOGOUT';

const addUserToSession = (userId) => {
    return {
        type: LOGIN,
        userId
    }
}

const removeUserFromSession = () => {
    return {
        type: LOGOUT
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

export const logout = () => {
    return async dispatch => {
        const res = await fetch('/api/session/logout', {
            method: 'PUT',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            dispatch(removeUserFromSession());
        }

        return res;
    }
}

export const getSessionData = () => {
    return async dispatch => {
        const res = await fetch('/api/session/data');

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUsers(res.data.users));
            dispatch(addInstruments(res.data.instruments));
            dispatch(addRecordings(res.data.recordings));
            dispatch(addStyles(res.data.styles));
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
        case LOGOUT:
            newState.userId = null;
            return newState;
        default:
            return state;
    }
}