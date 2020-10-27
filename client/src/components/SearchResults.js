import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserSearch from './UserSearch';
import UserSearchRecording from './UserSearchRecording';
import SearchResultContext from '../contexts/SearchResultContext';

const SearchResults = (props) => {
    const searchResults = useSelector(state => state.session.searchResults);
    const [activeResult, setActiveResult] = useState(searchResults[0]);

    const value = {
        setActiveResult
    }

    return (
        <SearchResultContext.Provider value={value}>
        <div style={{minHeight: "59vh"}}>
            <div style={{height: "59vh", width: '70%', gridTemplateColumns: `repeat(${searchResults.length}, 10%)`, margin: "0 auto"}}>
            {
                searchResults.length ?
                searchResults.map((id, i) => <UserSearch id={id} key={`user-${i + 1}`}/>) :
                <></>
            }
            </div>
            <div>
                <UserSearchRecording userId={activeResult} />
            </div>
        </div>
        </SearchResultContext.Provider>
    )
}

export default withRouter(SearchResults);