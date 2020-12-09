import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { toggleRecordingModal } from '../store/ui/profilePage';
import Recording from './Recording';
import AddRecordingButton from './AddRecordingButton';
import RecordingFormContext from '../contexts/RecordingFormContext';
import recordingStyles from '../css-modules/Recordings.module.css';


const Recordings = ({ isOwner, userProfile, userRecordings, className }) => {
    const dispatch = useDispatch();

    const handleNewRecordingClick = () => {
        dispatch(toggleRecordingModal());
    }

    const value = {
        handleNewRecordingClick
    };

    return (
        <RecordingFormContext.Provider value={value}>
        <div className={recordingStyles.recordingsContainer}>
            <div className={recordingStyles.recordingsHeaderContainer}>
                <h2 className={recordingStyles.recordingsHeader}>Recordings</h2>
            <AddRecordingButton isOwner={isOwner} />
            </div>
            <div style={{
            display: "grid",
            gridTemplateRows: userRecordings ? `repeat(${userRecordings.length}, 1fr)` : ""}}>
            {
            userRecordings.length ?
            userRecordings.map((recording, i) => <Recording key={`recording-${i + 1}`} recording={recording} i={i + 1} isOwner={isOwner}/>) :
            <div className={recordingStyles.recordingPlaceholderContainer}>
                <h1 className={recordingStyles.recordingPlaceholderText}>This user has not yet added any recordings</h1>
            </div>
            }
            </div>
        </div>
        </RecordingFormContext.Provider>
    )
}

const mapStateToProps = (state, { isOwner, userProfile }) => {
    return {
        userRecordings: userProfile && Object.keys(state.entities.recordings).length ? Object.values(userProfile.profileInfo.recordings).map((recording) => {
            return {
                id: recording.recording_id,
                url: state.entities.recordings[recording.recording_id] ? state.entities.recordings[recording.recording_id].url : null,
                title: recording.title,
                description: recording.description
            }
        }) : []
    }
}

export default connect(mapStateToProps)(Recordings);