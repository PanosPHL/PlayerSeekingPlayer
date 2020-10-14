import React from 'react';
import { connect } from 'react-redux';
import Recording from './Recording';


const Recordings = ({ isOwner, userProfile, recordings, className }) => {
    return (
        <div className={className}>
            { recordings.map((recording, i) => <Recording key={`recording-${i + 1}`} recording={recording}/>)}
        </div>
    )
}

const mapStateToProps = (state, { isOwner, userProfile }) => {
    return {
        recordings: userProfile ? userProfile.profileInfo.recordings.map((recording) => {
            return {
                id: recording.recording_id,
                url: state.entities.recordings[recording.recording_id].url,
                title: recording.title,
                description: recording.description
            }
        }) : ""
    }
}

export default connect(mapStateToProps)(Recordings);