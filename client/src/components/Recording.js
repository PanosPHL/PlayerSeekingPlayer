import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setRecordingFormId } from '../store/session';
import { toggleRecordingModal } from '../store/ui/profilePage';
import YouTubePlayer from './YouTubePlayer';
import RecordingContext from '../contexts/RecordingContext';
import recordingStyles from '../css-modules/Recordings.module.css';


const Recording = ({ recording, i, isOwner }) => {
    const dispatch = useDispatch();
    const { id, title, description, url } = recording;
    const youtubeRegex = /https:\/\/www\.youtube\.com/g;
    const [loading, setLoading] = useState(true);

    const value = {
        get: {
            loading
        },
        set: {
            setLoading
        }
    };

    const handleEditClick = () => {
        dispatch(toggleRecordingModal());
        dispatch(setRecordingFormId(id));
        document.body.classList.add('noscroll');
    }

    return (
        <RecordingContext.Provider value={value}>
            <div style={{
                gridRow: `${i} / ${i + 1}`
            }}
                className={(i === 1 ? recordingStyles.firstRecording : recordingStyles.recordingContainer) +
                    (loading ? " " + recordingStyles.loading : "")}>
                <div className={recordingStyles.recordingInnerContainer}>
                    <div className={recordingStyles.recordingHeaderContainer}>
                        <h3 className={recordingStyles.recordingTitle}>{title}</h3>
                        {isOwner ? <button className={recordingStyles.editButton} onClick={handleEditClick}>
                        <i className="fas fa-pencil-alt"></i>
                        </button> : <></>}
                    </div>
                    <div className={recordingStyles.recordingContentContainer}>
                        {youtubeRegex.test(url) ?
                            <YouTubePlayer videoId={url.split('v=')[1]} i={i} width="640" height="360" type="profile" /> :
                            <></>
                        }
                        <div className={recordingStyles.recordingDescriptionContainer}>
                            {description ?
                                <div>
                                    <h4 className={recordingStyles.aboutRecordingHeader}>About this recording:</h4>
                                    <p className={recordingStyles.recordingDescription}>{description}</p>
                                </div>
                                : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </RecordingContext.Provider >
    )
}

export default Recording;