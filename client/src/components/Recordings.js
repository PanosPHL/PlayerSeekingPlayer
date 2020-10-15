import React from 'react';
import { connect } from 'react-redux';
import Recording from './Recording';


const Recordings = ({ isOwner, userProfile, userRecordings, className }) => {
    console.log(userRecordings);
    return (
        <div>
            {
            userRecordings.map((recording, i) => <Recording key={`recording-${i + 1}`} recording={recording} i={i + 1}/>)
            }
        </div>
    )
}

const mapStateToProps = (state, { isOwner, userProfile }) => {
    return {
        userRecordings: userProfile ? Object.values(userProfile.profileInfo.recordings).map((recording) => {
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