import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchRecordingContext from '../contexts/SearchRecordingContext';
import YouTubePlayer from './YouTubePlayer';
import recordingStyles from '../css-modules/Recordings.module.css';

const UserSearchRecording = ({ userId }) => {
    const [loading, setLoading] = useState(true);
    const recordingInfo = useSelector(state =>  {
        const profileInfo = state.entities.users[userId].profileInfo;
        const recordings = Object.keys(profileInfo.recordings);
        const recentRecording = recordings.length ? Math.max(...recordings) : null;
        if (recentRecording) {
            return {
                url: state.entities.recordings[recentRecording].url,
                title: state.entities.users[userId].profileInfo.recordings[recentRecording].title,
                description: state.entities.users[userId].profileInfo.recordings[recentRecording].description
            }
        }
        return null;
    })

    const value = {
        get: {
            loading
        },
        set: {
            setLoading
        }
    }
    if (recordingInfo) {
        return (
            <SearchRecordingContext.Provider value={value}>
                <div className={loading ? recordingStyles.loading : ""}>
                    <YouTubePlayer videoId={recordingInfo.url.split('v=')[1]} height="90px" width="160px" i="1" type="search" />
                </div>
            </SearchRecordingContext.Provider>
        )
    } else {
        return (
            <h3>This user has no recordings</h3>
        )
    }
}

export default UserSearchRecording;