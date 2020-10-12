const SIGN_UP_USER_INFO = 'ui/SIGN_UP_USER_INFO';
const SIGN_UP_DISPLAY_MAP = 'ui/SIGN_UP_DISPLAY_MAP'

export const displayUserInfoForm = () => {
    return {
        type: SIGN_UP_USER_INFO
    }
}

export const displayMap = () => {
    return {
        type: SIGN_UP_DISPLAY_MAP
    }
}

const initialSignUpFormUIState = {
    userInfo: null,
    map: null
}

export default function uiReducer(state = initialSignUpFormUIState, action) {
    switch(action.type) {
        case SIGN_UP_USER_INFO:
            return { userInfo: true, map: false }
        case SIGN_UP_DISPLAY_MAP:
            return { userInfo: false, map: true }
        default:
            return state;
    }
}