import configureStore from '../store/configureStore';
import { saveState, loadState } from '../store/localStorage';

const initialState = loadState();

const store = configureStore(initialState);

store.subscribe(() => {
    const state = Object.assign({}, store.getState());

    saveState(state);
});

export default store;