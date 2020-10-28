import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserSearch from './UserSearch';
import UserSearchRecording from './UserSearchRecording';
import SearchResultContext from '../contexts/SearchResultContext';
import searchStyles from '../css-modules/Search.module.css';

const SearchResults = (props) => {
    const searchResults = useSelector(state => state.session.searchResults);
    const [activeResult, setActiveResult] = useState(searchResults[0]);

    const value = {
        get: {
            activeResult
        },
        set: {
            setActiveResult
        }
    };

    return (
        <SearchResultContext.Provider value={value}>
        <div className={searchStyles.pageContainer}>
            <div className={searchStyles.innerPageContainer}>
                <div className={searchStyles.resultAndHeaderContainer}>
                <h2 className={searchStyles.musiciansInAreaHeader}>Musicians in Your Area</h2>
            <div className={searchStyles.resultContainer} style={{gridTemplateRows: `repeat(${searchResults.length}, 16%)`}}>
            {
                searchResults.length ?
                searchResults.map((id, i) => <UserSearch id={id} first={i === 0} last={i === searchResults.length - 1 && i > 5} key={`user-${i + 1}`}/>) :
                <></>
            }
            </div>
                </div>
            <div className={searchStyles.recordingContainerWrapper}>
                <UserSearchRecording userId={activeResult} />
            </div>
        </div>
            </div>
        </SearchResultContext.Provider>
    )
}

export default withRouter(SearchResults);