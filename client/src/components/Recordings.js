import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { toggleRecordingModal } from '../store/ui/profilePage';
import Recording from './Recording';


const Recordings = ({ isOwner, userProfile, userRecordings, className }) => {
    const dispatch = useDispatch();

    const handleNewRecordingClick = () => {
        dispatch(toggleRecordingModal());
        document.body.classList.add('noscroll');
    }

    return (
        <div>
            {isOwner ? <button onClick={handleNewRecordingClick}><i className="fas fa-plus"></i><p>Add Recording</p></button> : <></>}
            {
            userRecordings.map((recording, i) => <Recording key={`recording-${i + 1}`} recording={recording} i={i + 1} isOwner={isOwner}/>)
            }
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