import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchRecordingContext from '../../../contexts/SearchRecordingContext';
import SearchResultContext from '../../../contexts/SearchResultContext';
import YouTubePlayer from '../../universal/YouTubePlayer';
import recordingStyles from '../../../css-modules/Recordings.module.css';
import searchStyles from '../../../css-modules/Search.module.css';
import UserSearchRecordingInfo from './UserSearchRecordingInfo';

const UserSearchRecording = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const userInfo = useSelector((state) => state.entities.users[userId]);
  const recordingInfo = useSelector((state) => {
    if (userInfo) {
      const profileInfo = userInfo.profileInfo;
      const recordings = Object.keys(profileInfo.recordings);
      const recentRecording = recordings.length
        ? Math.max(...recordings)
        : null;
      if (recentRecording) {
        return {
          url: state.entities.recordings[recentRecording].url,
          title:
            state.entities.users[userId].profileInfo.recordings[recentRecording]
              .title,
          description:
            state.entities.users[userId].profileInfo.recordings[recentRecording]
              .description,
        };
      }
    }
    return null;
  });

  const value = {
    get: {
      loading,
      showMore,
    },
    set: {
      setLoading,
      setShowMore,
    },
  };

  const {
    get: { activeResult },
  } = useContext(SearchResultContext);

  useEffect(() => {
    setLoading(true);
  }, [activeResult]);

  if (recordingInfo) {
    return (
      <SearchRecordingContext.Provider value={value}>
        <div
          className={
            searchStyles.searchRecordingContainer +
            (loading ? ' ' + recordingStyles.loading : '') +
            ' ' +
            (userInfo.profileInfo.biography
              ? searchStyles.withBio
              : searchStyles.withoutBio)
          }
        >
          <h2 className={searchStyles.checkOutHeader}>
            Check out {userInfo.firstName + ' ' + userInfo.lastName}
          </h2>
          <div className={searchStyles.recordingContainer}>
            <YouTubePlayer
              videoId={recordingInfo.url.split('v=')[1]}
              height="180px"
              width="320px"
              i="1"
              type="search"
            />
          </div>
          <div>
            {userInfo.profileInfo.biography ? (
              <>
                <UserSearchRecordingInfo
                  name={userInfo.firstName + ' ' + userInfo.lastName}
                  bio={userInfo.profileInfo.biography}
                />
              </>
            ) : (
              <h4 className={searchStyles.noBio}>
                This user has not yet added a biography
              </h4>
            )}
          </div>
        </div>
      </SearchRecordingContext.Provider>
    );
  } else if (!userInfo) {
    return (
      <div className={searchStyles.searchRecordingContainer}>
        <h3>We can't find any artists to show you recordings of!</h3>
      </div>
    );
  } else {
    return <h3>This user has no recordings</h3>;
  }
};

export default UserSearchRecording;
