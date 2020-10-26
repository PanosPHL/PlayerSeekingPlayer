import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { search } from '../store/session';
import { toggleSearchDropdown } from '../store/ui/navbar';
import { setErrors, clearErrors } from '../store/errors';
import SearchInstruments from './SearchInstruments';
import SearchStyles from './SearchStyles';
import SearchContext from '../contexts/SearchContext';
import navStyles from '../css-modules/NavComponents.module.css';

const initialState = {
    firstName: '',
    lastName: '',
    instruments: [],
    styles: [],
    radius: 5
}

const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const ADD_INSTRUMENT = 'ADD_INSTRUMENT';
const REMOVE_INSTRUMENT = 'REMOVE_INSTRUMENT';
const ADD_STYLE = 'ADD_STYLE';
const REMOVE_STYLE = 'REMOVE_STYLE';
const UPDATE_RADIUS = 'UPDATE_RADIUS';

function searchReducer(state, action) {
    const newState = Object.assign({}, state);
    let slicePoint;
    switch(action.type) {
        case UPDATE_FIRST_NAME:
            newState.firstName = action.firstName;
            return newState;
        case UPDATE_LAST_NAME:
            newState.lastName = action.lastName;
            return newState;
        case ADD_INSTRUMENT:
            newState.instruments = [...newState.instruments, action.instrumentId];
            return newState;
        case REMOVE_INSTRUMENT:
            slicePoint = newState.instruments.indexOf(action.instrumentId);
            newState.instruments = [...newState.instruments.slice(0, slicePoint), ...newState.instruments.slice(slicePoint + 1)];
            return newState;
        case ADD_STYLE:
            newState.styles = [...newState.styles, action.styleId];
            return newState;
        case REMOVE_STYLE:
            slicePoint = newState.styles.indexOf(action.styleId);
            newState.styles = [...newState.styles.slice(0, slicePoint), ...newState.styles.slice(slicePoint + 1)];
            return newState;
        case UPDATE_RADIUS:
            newState.radius = action.radius;
            return newState;
        default:
            return state;
    }
}

const SearchDropdown = ({ className, history }) => {
    const dispatch = useDispatch();
    const [state, searchLocalDispatch] = useReducer(searchReducer, initialState);
    const { userId } = useSelector(state => state.session);

    useEffect(() => {
        dispatch(clearErrors());
    }, [state, dispatch]);

    const handleNameChange = (e) => {
        const [firstName, lastName] = e.target.value.split(' ');
        searchLocalDispatch({ type: UPDATE_FIRST_NAME, firstName });
        searchLocalDispatch({ type: UPDATE_LAST_NAME, lastName });
    }

    const addInstrument = (e) => {
        searchLocalDispatch({ type: ADD_INSTRUMENT, instrumentId: parseInt(e.target.value) });
    }

    const removeInstrument = (e) => {
        searchLocalDispatch({ type: REMOVE_INSTRUMENT, instrumentId: parseInt(e.target.value) });
    }

    const addStyle = (e) => {
        searchLocalDispatch({ type: ADD_STYLE, styleId: parseInt(e.target.value) });
    }

    const removeStyle = (e) => {
        searchLocalDispatch({ type: REMOVE_STYLE, styleId: parseInt(e.target.value) });
    }

    const updateRadius = (e) => {
        searchLocalDispatch({ type: UPDATE_RADIUS, radius: parseInt(e.target.value) });
    }

    const value = {
        addInstrument,
        removeInstrument,
        addStyle,
        removeStyle
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(search(
            state.firstName, state.lastName, state.radius, state.instruments, state.styles, userId
        ));
        if (res.ok) {
            dispatch(toggleSearchDropdown());
            history.push('/search');
            return;
        }

        dispatch(setErrors(res.data.errors));
    }

    return (
        <SearchContext.Provider value={value}>
            <div className={navStyles.searchDropdownContainer}>
            <div className={navStyles.searchDropdownTriangle}>
            </div>
            <h3>Search</h3>
                <form method="" action="" onSubmit={handleSubmit}>
                    <div>
                        <p>
                            <label>Name*</label>
                        </p>
                        <input type='text' name="name" value={state.firstName} onChange={handleNameChange} />
                    </div>
                    <div>
                        <p>
                            <label>Distance</label>
                        </p>
                        <select onChange={updateRadius}>
                            <option value={5}>&lt; 5 mi</option>
                            <option value={10}>&lt; 10 mi</option>
                            <option value={15}>&lt; 15 mi</option>
                            <option value={20}>&lt; 20 mi</option>
                            <option value={25}>&lt; 25 mi</option>
                        </select>
                    </div>
                    <div className={navStyles.searchInstrumentDropdownContainer}>
                        <p>
                            <label>Instruments <span>&#9654;</span></label>
                        </p>
                        <SearchInstruments className={navStyles.searchInstrumentDropdown} />
                    </div>
                    <div className={navStyles.searchStylesDropdownContainer}>
                        <p>
                            <label>Styles <span>&#9654;</span></label>
                        </p>
                        <SearchStyles className={navStyles.searchStyleDropdown} />
                    </div>
                    <button type="submit">Search for Player</button>
                </form>
            </div>
        </SearchContext.Provider>
    )
}

export default withRouter(SearchDropdown);