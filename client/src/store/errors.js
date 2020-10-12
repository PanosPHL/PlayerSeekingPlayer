const SET_ERRORS = 'errors/SET_ERRORS';
const CLEAR_ERRORS = 'errors/CLEAR_ERRORS';

export const setErrors = (errors) => {
    return {
        type: SET_ERRORS,
        errors
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

export default function errorReducer(state = [], action) {
    switch(action.type) {
        case SET_ERRORS:
            return action.errors;
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
}