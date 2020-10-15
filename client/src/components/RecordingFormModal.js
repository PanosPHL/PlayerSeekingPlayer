import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRecordingFormId } from '../store/session';
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

    const dispatch = useDispatch();

    const handleCloseClick = () => {
        dispatch(toggleRecordingModal());
        dispatch(setRecordingFormId(null));
        document.body.classList.remove('noscroll');
    }

    if (recordingFormModal) {
        return (
            <div style={{height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.2)", zIndex: "1", position: "absolute", overflow: 'hidden'}}>
                <div>
                    <button onClick={handleCloseClick}><i className="far fa-window-close"></i></button>
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