import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSearchDropdown } from '../store/ui/navbar';
import SearchDropdown from './SearchDropdown';
import navStyles from '../css-modules/NavComponents.module.css';


const SearchIconAndDropdown = () => {
    const dispatch = useDispatch();
    const { searchDropdown } = useSelector(state => state.ui.navbar);

    const handleSearchClick = () => {
        dispatch(toggleSearchDropdown());
    }

    return (
        <div className={navStyles.searchContainer}>
        <button onClick={handleSearchClick}>
            <i className="fas fa-search"></i>
        </button>
        { searchDropdown ? <SearchDropdown /> : <></> }
        </div>
    )
}

export default SearchIconAndDropdown;