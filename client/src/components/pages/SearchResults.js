import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserSearch from '../sections/Search/UserSearch';
import UserSearchRecording from '../sections/Search/UserSearchRecording';
import SearchResultContext from '../../contexts/SearchResultContext';
import searchStyles from '../../css-modules/Search.module.css';

const SearchResults = () => {
  const searchResults = useSelector((state) => state.session.searchResults);
  const [activeResult, setActiveResult] = useState(searchResults[0]);

  const value = {
    get: {
      activeResult,
    },
    set: {
      setActiveResult,
    },
  };

  return (
    <SearchResultContext.Provider value={value}>
      <div className={searchStyles.pageContainer}>
        <div className={searchStyles.innerPageContainer}>
          <div className={searchStyles.resultAndHeaderContainer}>
            <h2 className={searchStyles.musiciansInAreaHeader}>
              {searchResults.length ? 'Musicians in Your Area' : 'No Results'}
            </h2>
            <div
              className={
                searchResults.length
                  ? searchStyles.resultContainer
                  : searchStyles.emptyResultContainer
              }
              style={
                searchResults.length
                  ? {
                      gridTemplateRows: `repeat(${searchResults.length}, 16%)`,
                    }
                  : {}
              }
            >
              {searchResults.length ? (
                searchResults.map((id, i) => (
                  <UserSearch
                    id={id}
                    first={i === 0}
                    last={i === searchResults.length - 1 && i > 5}
                    key={`user-${i + 1}`}
                  />
                ))
              ) : (
                <>
                  <h2 className={searchStyles.noResultMessage}>
                    Sorry, we couldn't find any users matching that criteria.
                  </h2>
                  <h2 className={searchStyles.noResultMessage}>
                    Remove the name and try again!
                  </h2>
                </>
              )}
            </div>
          </div>
          <div className={searchStyles.recordingContainerWrapper}>
            <UserSearchRecording userId={activeResult} />
          </div>
        </div>
      </div>
    </SearchResultContext.Provider>
  );
};

export default SearchResults;
