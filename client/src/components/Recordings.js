import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { toggleRecordingModal } from '../store/ui/profilePage';
import Recording from './Recording';
import recordingStyles from '../css-modules/Recordings.module.css';


const Recordings = ({ isOwner, userProfile, userRecordings, className }) => {
    const dispatch = useDispatch();

    const handleNewRecordingClick = () => {
        dispatch(toggleRecordingModal());
        document.body.classList.add('noscroll');
    }

    return (
        <div className={recordingStyles.recordingsContainer}>
            <div className={recordingStyles.recordingsHeaderContainer}>
                <h2 className={recordingStyles.recordingsHeader}>Recordings</h2>
            {isOwner ? <button className={recordingStyles.addRecordingButton} onClick={handleNewRecordingClick}><i className="fas fa-plus"></i><p>Add Recording</p></button> : <></>}
            </div>
            <div style={{
            display: "grid",
            gridTemplateRows: userRecordings ? `repeat(${userRecordings.length}, 1fr)` : ""}}>
            {
            userRecordings.map((recording, i) => <Recording key={`recording-${i + 1}`} recording={recording} i={i + 1} isOwner={isOwner}/>)
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state, { isOwner, userProfile }) => {
    return {
        userRecordings: userProfile && Object.keys(state.entities.recordings).length ? Object.values(userProfile.profileInfo.recordings).map((recording) => {
            return {
                id: recording.recording_id,
                url: state.entities.recordings[recording.recording_id].url,
                title: recording.title,
                description: recording.description
            }
        }) : []
    }
}

export default connect(mapStateToProps)(Recordings);