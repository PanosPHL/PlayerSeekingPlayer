import Cookie from 'js-cookie';
import { login } from './session';
import { ADD_PROFILE_RECORDING, UPDATE_PROFILE_RECORDING, DELETE_PROFILE_RECORDING } from './recordings';
import { ADD_INVITATION } from './invitations';

const SIGNUP_USER = 'users/SIGNUP_USER';
const SET_USERS = 'users/SET_USERS';
const UPDATE_OVERVIEW = 'users/UPDATE_OVERVIEW';
const UPDATE_BIO = 'users/UPDATE_BIO';
const UPDATE_PROFILE_PICTURE = 'users/UPDATE_PROFILE_PICTURE';

const updateProfilePicture = (profile) => {
    return {
        type: UPDATE_PROFILE_PICTURE,
        profile
    }
}

const updateBio = (userInfo) => {
    return {
        type: UPDATE_BIO,
        userInfo
    }
}

const updateOverview = (userInfo) => {
    return {
        type: UPDATE_OVERVIEW,
        userInfo
    }
}

const addUser = (user) => {
    return {
        type: SIGNUP_USER,
        user
    }
}

export const addUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const signup = (firstName, lastName, email, password, confirmPassword, dateOfBirth, location, lat, lng) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
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
                csrfToken
            })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addUser(res.data));
            await dispatch(login(email, password));
        }

        return res;
    }
}

export const putAndUpdateOverview = (userId, dateOfBirth, instruments, styles, location, lat, lng, validLocation) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/users/${userId}/overview/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                date_of_birth: dateOfBirth.toISOString().split('T')[0],
                instruments,
                styles,
                location,
                validLocation,
                lat,
                lng,
                csrfToken
            })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(updateOverview(res.data));
        }

        return res;
    }
}

export const putAndUpdateBio = (userId, bio) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/users/${userId}/bio/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ bio, csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(updateBio(res.data));
        }

        return res;
    }
}

export const putAndUpdateProfilePic = (userId, imgData) => {
    const csrfToken = Cookie.get('XSRF-TOKEN');
    return async dispatch => {
        const res = await fetch(`/api/users/${userId}/profile_picture/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ img: imgData, csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(updateProfilePicture(res.data.profile));
        }

        return res;
    }
}

export default function usersReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    let newUser;
    let newProfileInfo;
    let newRecordings;
    let newSender;
    let newRecipient;
    switch (action.type) {
        case SIGNUP_USER:
            newState[action.user.id] = action.user;
            return newState;
        case SET_USERS:
            for (const user of action.users) {
                newState[user.id] = user;
            }
            return newState;
        case ADD_PROFILE_RECORDING:
            newProfileInfo = Object.assign({}, newState[[action.profileRecording["profile_id"]]].profileInfo);
            newRecordings = { [action.profileRecording.recording_id]: action.profileRecording, ...newProfileInfo.recordings };
            newProfileInfo.recordings = newRecordings;
            newState[[action.profileRecording["profile_id"]]].profileInfo = newProfileInfo;
            return newState;
        case UPDATE_PROFILE_RECORDING:
            newProfileInfo = Object.assign({}, newState[[action.profileRecording["profile_id"]]].profileInfo);
            newRecordings = Object.assign({}, newProfileInfo.recordings);
            newRecordings[action.profileRecording["recording_id"]] = action.profileRecording;
            newProfileInfo.recordings = newRecordings;
            newState[[action.profileRecording["profile_id"]]].profileInfo = newProfileInfo;
            return newState;
        case UPDATE_OVERVIEW:
            newUser = Object.assign({}, newState[[action.userInfo.id]]);
            newProfileInfo = Object.assign({}, newUser.profileInfo);

            newUser.dateOfBirth = action.userInfo.dateOfBirth;
            newUser.lat = action.userInfo.lat;
            newUser.lng = action.userInfo.lng;

            newProfileInfo.location = action.userInfo.profileInfo.location
            newProfileInfo.recordings = action.userInfo.profileInfo.recordings
            newProfileInfo.styles = action.userInfo.profileInfo.styles;
            newProfileInfo.instruments = action.userInfo.profileInfo.instruments;

            newUser.profileInfo = newProfileInfo;
            newState[[action.userInfo.id]] = newUser;
            return newState;
        case UPDATE_BIO:
            newUser = Object.assign({}, newState[[action.userInfo.id]]);
            newProfileInfo = Object.assign({}, newUser.profileInfo);

            newProfileInfo.biography = action.userInfo.profileInfo.biography;
            newUser.profileInfo = newProfileInfo;

            newState[[action.userInfo.id]] = newUser;
            return newState
        case DELETE_PROFILE_RECORDING:
            newUser = Object.assign({}, newState[[action.userId]]);
            newProfileInfo = Object.assign({}, newUser.profileInfo);
            newRecordings = Object.assign({}, newProfileInfo.recordings);

            delete newRecordings[action.recordingId];

            newProfileInfo.recordings = newRecordings;
            newUser.profileInfo = newProfileInfo;
            newState[[action.userId]] = newUser;
            return newState;
        case UPDATE_PROFILE_PICTURE:
            newUser = Object.assign({}, newState[[action.profile.user_id]]);
            newProfileInfo = Object.assign({}, newUser.profileInfo);
            newProfileInfo.profilePic = action.profile.profilePic;
            newUser.profileInfo = newProfileInfo;
            newState[[action.profile.user_id]] = newUser;
            return newState;
        case ADD_INVITATION:
            newSender = Object.assign({}, newState[action.invitation.senderId]);
            newSender.sentInvitations = [...newSender.sentInvitations, action.invitation.id];
            newRecipient = Object.assign({}, newState[action.invitation.recipientId]);
            newRecipient.receivedInvitations = [...newSender.receivedInvitations, action.invitation.id];

            newState[action.invitation.senderId] = newSender;
            newState[action.invitation.recipientId] = newRecipient;

            return newState;
        default:
            return state;
    }
}