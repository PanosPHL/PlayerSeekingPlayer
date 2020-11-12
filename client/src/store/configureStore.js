
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
// import thunk from './middleware/thunk';
import thunk from 'redux-thunk'
import bands from './bands';
import errors from './errors';
import instruments from './instruments';
import recordings from './recordings';
import session from './session';
import users from './users';
import styles from './styles';
import signUpForm from './ui/signUpForm';
import navbar from './ui/navbar';
import profilePage from './ui/profilePage';
import myBands from './ui/myBands';

import { LOGOUT } from './session';

let storeEnhancer;

const entities = combineReducers({
    bands,
    instruments,
    recordings,
    styles,
    users
});

const ui = combineReducers({
    signUpForm,
    myBands,
    navbar,
    profilePage
});

const appReducer = combineReducers({
    session,
    entities,
    ui,
    errors
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
}

if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
    storeEnhancer = applyMiddleware(thunk);
}


export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        storeEnhancer
    )
}