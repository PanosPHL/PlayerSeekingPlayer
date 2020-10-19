import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRecordingFormId } from '../store/session';
import { toggleRecordingModal } from '../store/ui/profilePage';
import { clearErrors } from '../store/errors';
import RecordingForm from './RecordingForm';
import recordingStyles from '../css-modules/Recordings.module.css';


const RecordingFormModal = () => {
    const { recordingFormModal } = useSelector(state => state.ui.profilePage);
    const { recordingFormId } = useSelector(state => state.session);
    let recInfo = useSelector(state => {
        if (!recordingFormId) {
            return {
                profileId: state.session.userId,
                recTitle: undefined,
                recURL: undefined,
                recDescription: undefined
            }
        }
        return {
            profileId: state.session.userId,
            recTitle: state.entities.users[state.session.userId].profileInfo.recordings[recordingFormId].title,
            recURL: state.entities.recordings[recordingFormId].url,
            recDescription: state.entities.users[state.session.userId].profileInfo.recordings[recordingFormId].description
        }
    });

    const dispatch = useDispatch();

    const handleCloseClick = () => {
        dispatch(toggleRecordingModal());
        dispatch(setRecordingFormId(null));
        dispatch(clearErrors());
        document.body.classList.remove('noscroll');
    }

    if (recordingFormModal) {
        return (
            <div style={{height: window.innerHeight,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: "1", position: "absolute",
            top: window.pageYOffset,
            overflow: 'hidden'}}>
                <div className={recordingFormId ? recordingStyles.editModalFormContainer : recordingStyles.addModalFormContainer}>
                    <button className={recordingStyles.modalFormClose} onClick={handleCloseClick}><i className="fas fa-times"></i></button>
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