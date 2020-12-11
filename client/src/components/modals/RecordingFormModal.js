import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRecordingFormId } from '../../store/session';
import { toggleRecordingModal } from '../../store/ui/profilePage';
import { clearErrors } from '../../store/errors';
import RecordingForm from '../forms/RecordingForm';
import ModalContainer from './ModalContainer';
import recordingStyles from '../../css-modules/Recordings.module.css';
import { removeRecording } from '../../store/recordings';


const RecordingFormModal = () => {
    const { recordingFormModal } = useSelector(state => state.ui.profilePage);
    const { recordingFormId, userId } = useSelector(state => state.session);
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
    }

    const handleDeleteClick = () => {
        dispatch(removeRecording(recordingFormId, userId));
        dispatch(toggleRecordingModal());
        dispatch(setRecordingFormId(null));
        dispatch(clearErrors());
    }

    if (recordingFormModal) {
        return (
            <ModalContainer>
                <div className={recordingFormId ? recordingStyles.editModalFormContainer : recordingStyles.addModalFormContainer}>
                    <button className={recordingStyles.modalFormClose} onClick={handleCloseClick}><i className="fas fa-times"></i></button>
                    <RecordingForm id={recordingFormId} recInfo={recInfo}/>
                    {
                    recordingFormId ?
                    <button onClick={handleDeleteClick} className={recordingStyles.deleteRecordingButton}><i className="fas fa-trash-alt"></i></button> :
                    <></>
                    }
                </div>
            </ModalContainer>
        )
    }

    return (
        <></>
    )
}

export default RecordingFormModal;