import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserSearch from './UserSearch';

const SearchResults = (props) => {
    console.log('I am being rendered');
    const searchResults = useSelector(state => state.session.searchResults);
    return (
        <div style={{minHeight: "59vh"}}>
            <div style={{height: "59vh", width: '70%', gridTemplateColumns: `repeat(${searchResults.length}, 10%)`}}>
            {
                searchResults.length ?
                searchResults.map((id) => <UserSearch id={id} />) :
                <></>
            }
            </div>
        </div>
    )
}

export default withRouter(SearchResults);