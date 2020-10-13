import Cookie from 'js-cookie';
import { login } from './session';

const csrfToken = Cookie.get('XSRF-TOKEN');

const SIGNUP_USER = 'users/SIGNUP_USER';
const SET_USERS = 'users/SET_USERS';

const addUser = (user) => {
    return {
        type: SIGNUP_USER,
        user
    }
}

const addUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const signup = (firstName, lastName, email, password, confirmPassword, dateOfBirth, location, lat, lng) => {
    return async dispatch => {
        const res = await fetch('/api/users/', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                password,
                "confirm_password": confirmPassword,
                "date_of_birth": dateOfBirth.toISOString().split('T')[0],
                location,
                lat,
                lng,
                csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUser(res.data));
            await dispatch(login(email, password));
        }

        return res;
    }
}

export const setUsers = () => {
    return async dispatch => {
        const res = await fetch('/api/users');

        res.data = await res.json();
        console.log(res);
        if (res.ok) {
            dispatch(addUsers(res.data.users));
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
        case SET_USERS:
            for (const user of action.users) {
                newState[user.id] = user;
            }
            return newState;
        default:
            return state;
    }
}