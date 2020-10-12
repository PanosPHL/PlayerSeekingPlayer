
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
// import thunk from './middleware/thunk';
import thunk from 'redux-thunk'
import session from './session';
import users from './users';
import signUpForm from './ui/signUpForm';
import errors from './errors';

let storeEnhancer;

const entities = combineReducers({
    users
});

const ui = combineReducers({
    signUpForm
});

const rootReducer = combineReducers({
    session,
    entities,
    ui,
    errors
});

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