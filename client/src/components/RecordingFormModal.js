import React from 'react';
import { useSelector } from 'react-redux';
import { toggleRecordingModal } from '../store/ui/profilePage';
import RecordingForm from './RecordingForm';


const RecordingFormModal = () => {
    const { recordingFormModal } = useSelector(state => state.ui.profilePage);
    const { recordingFormId } = useSelector(state => state.session);
    let recInfo = useSelector(state => {
        if (!recordingFormId) {
            return {
                recTitle: undefined,
                recURL: undefined,
                recDescription: undefined
            }
        }
        return {
            recTitle: state.entities.users[state.session.userId].profileInfo.recordings[recordingFormId].title,
            recURL: state.entities.recordings[recordingFormId].url,
            recDescription: state.entities.users[state.session.userId].profileInfo.recordings[recordingFormId].description
        }
    });

    if (recordingFormModal) {
        return (
            <div style={{height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.2)", zIndex: "1", position: "absolute"}}>
                <div>
                    <RecordingForm id={recordingFormId} recInfo={recInfo}/>
                </div>
            </div>
        )
    }

    return (
        <></>
    )
}

export default RecordingFormModal;