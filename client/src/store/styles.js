const SET_STYLES = 'styles/SET_STYLES';

export const addStyles = (styles) => {
    return {
        type: SET_STYLES,
        styles
    }
}

export default function styleReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case SET_STYLES:
            for (const style of action.styles) {
                newState[style.id] = style;
            }
            return newState;
        default:
            return state;
    }
}