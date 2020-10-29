import React, { useReducer, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { search } from '../store/session';
import { toggleSearchDropdown } from '../store/ui/navbar';
import { setErrors, clearErrors } from '../store/errors';
import { toggleSearchInstrumentDropdown, toggleSearchStyleDropdown } from '../store/ui/navbar';
import SearchInstruments from './SearchInstruments';
import SearchStyles from './SearchStyles';
import SearchContext from '../contexts/SearchContext';
import Errors from './Errors';
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
    const { instrumentDropdown, styleDropdown } = useSelector(state => state.ui.navbar.searchDropdown);
    const errors = useSelector(state => state.errors);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(clearErrors());
    }, [state, dispatch]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        const [firstName, lastName] = e.target.value.split(' ');
        searchLocalDispatch({ type: UPDATE_FIRST_NAME, firstName });
        searchLocalDispatch({ type: UPDATE_LAST_NAME, lastName });
    }

    const toggleInstrumentDropdown = () => {
        dispatch(toggleSearchInstrumentDropdown());
    }

    const toggleStyleDropdown = () => {
        dispatch(toggleSearchStyleDropdown());
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

    const handleSearchClose = () => {
        dispatch(toggleSearchDropdown());
    }

    return (
        <SearchContext.Provider value={value}>
            <div className={navStyles.searchDropdownContainer}>
            <div className={navStyles.searchDropdownTriangle}>
            </div>
            <h3 className={navStyles.searchHeader}>Search</h3>
            <button onClick={handleSearchClose} className={navStyles.searchFormClose}>
            <i className="fas fa-times"></i>
            </button>
            {
                errors && errors.length ?
                <Errors errors={errors} className={navStyles.searchErrors}/>
                : <></>
            }
                <form className={navStyles.searchForm} method="" action="" onSubmit={handleSubmit}>
                    <div className={navStyles.nameContainer + " form-control-group"}>
                        <p>
                            <label className="labels">Name</label>
                        </p>
                        <input className={navStyles.name} type='text' name="name" value={name} onChange={handleNameChange} />
                    </div>
                    <div className={navStyles.distanceContainer + " form-control-group"}>
                        <p>
                            <label className="labels">Distance<span style={{color: 'red'}}>*</span></label>
                        </p>
                        <select className={navStyles.distanceDropdown} onChange={updateRadius}>
                            <option value={5}>&lt; 5 mi</option>
                            <option value={10}>&lt; 10 mi</option>
                            <option value={15}>&lt; 15 mi</option>
                            <option value={20}>&lt; 20 mi</option>
                            <option value={25}>&lt; 25 mi</option>
                        </select>
                    </div>
                    <div
                    className={navStyles.searchInstrumentDropdownContainer + " form-control-group"}>
                        <p
                        className={instrumentDropdown ? navStyles.openLabel : navStyles.closedLabel}
                        onClick={toggleInstrumentDropdown}>
                            <label className="labels">Instruments<span style={{color: 'red'}}>*</span> <span
                            className={instrumentDropdown ? navStyles.downInstrumentTriangle : navStyles.rightInstrumentTriangle}>&#9654;</span></label>
                        </p>
                        <SearchInstruments
                        className={instrumentDropdown ? navStyles.searchInstrumentDropdown : navStyles.hiddenInstrumentDropdown}
                        labelStyle={navStyles.checkboxLabel} />
                    </div>
                    <div className={navStyles.searchStyleDropdownContainer + " form-control-group"}>
                        <p
                        className={styleDropdown ? navStyles.openLabel : navStyles.closedLabel}
                        onClick={toggleStyleDropdown}>
                            <label className="labels">Styles<span style={{color: 'red'}}>*</span> <span
                            className={styleDropdown ? navStyles.downStyleTriangle : navStyles.rightStyleTriangle}>&#9654;</span></label>
                        </p>
                        <SearchStyles
                        className={styleDropdown ? navStyles.searchStyleDropdown : navStyles.hiddenStyleDropdown}
                        labelStyle={navStyles.checkboxLabel} />
                    </div>
                    <button className={navStyles.submitSearch} type="submit">Search for Player</button>
                    <span className={navStyles.requiredField}><span style={{color: 'red'}}>*</span> Required field</span>
                </form>
            </div>
        </SearchContext.Provider>
    )
}

export default withRouter(SearchDropdown);