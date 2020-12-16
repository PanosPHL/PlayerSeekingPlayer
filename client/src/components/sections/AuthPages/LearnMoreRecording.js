import React, { useState } from 'react';
import LearnMoreContext from '../../../contexts/LearnMoreContext';
import YouTubePlayer from '../../universal/YouTubePlayer';
import recordingStyles from '../../../css-modules/Recordings.module.css';

const LearnMoreRecording = ({ videoId }) => {
    const [loading, setLoading] = useState(true);

    const value = {
        get: {
            loading
        },
        set: {
            setLoading
        }
    };


    return (
        <LearnMoreContext.Provider value={value}>
            <div style={{ backgroundColor: "black" }} className={loading ? recordingStyles.loading : ""}>
                <YouTubePlayer videoId={videoId} i="1" width="1024" height="576" />
            </div>
        </LearnMoreContext.Provider>
    )
}

export default LearnMoreRecording;
