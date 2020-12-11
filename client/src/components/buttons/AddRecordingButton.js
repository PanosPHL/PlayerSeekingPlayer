import React, { useContext } from 'react';
import RecordingFormContext from '../../contexts/RecordingFormContext';
import recordingStyles from '../../css-modules/Recordings.module.css';


const AddRecordingButton = ({ isOwner }) => {
    const { handleNewRecordingClick } = useContext(RecordingFormContext);

    return (
        <>
        {isOwner ?
        <button className={recordingStyles.addRecordingButton} onClick={handleNewRecordingClick}><i className="fas fa-plus"></i><p className={recordingStyles.addRecording}>Add Recording</p></button> :
        <></>}
        </>
    )
}

export default AddRecordingButton;