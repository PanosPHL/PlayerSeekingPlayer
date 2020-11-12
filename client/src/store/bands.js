import Cookie from 'js-cookie';

const ADD_BAND = 'bands/ADD_BAND';
const SET_BANDS = 'bands/SET_BANDS';

const addBand = (band) => {
    return {
        type: ADD_BAND,
        band
    }
}

export const setBands = (bands) => {
    return {
        type: SET_BANDS,
        bands
    }
}

export const postAndAddBand = (name, isPublic = true, owner, style) => {
    return async dispatch => {
        const csrfToken = Cookie.get('XSRF-TOKEN');
        const res = await fetch('/api/bands/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ name, isPublic, owner, style, csrfToken })
        });

        res.data = await res.json();

        if (res.ok) {
            dispatch(addBand(res.data.band));
        }

        return res;
    }
}

export default function bandReducer(state = {}, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case SET_BANDS:
            for (const band of action.bands) {
                newState[band.id] = band;
            }
            return newState;
        case ADD_BAND:
            newState[action.band.id] = action.band;
            return newState;
        default:
            return state;
    }
}