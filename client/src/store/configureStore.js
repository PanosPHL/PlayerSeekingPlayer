
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
// import thunk from './middleware/thunk';
import thunk from 'redux-thunk'
import session from './session';
import users from './users';
import errors from './errors';
import instruments from './instruments';
import recordings from './recordings';
import styles from './styles';
import signUpForm from './ui/signUpForm';
import navbar from './ui/navbar';
import profilePage from './ui/profilePage';

import { LOGOUT } from './session';

let storeEnhancer;

const entities = combineReducers({
    users,
    instruments,
    recordings,
    styles
});

const ui = combineReducers({
    signUpForm,
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