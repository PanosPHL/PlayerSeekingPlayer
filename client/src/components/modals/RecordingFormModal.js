import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRecordingFormId } from '../../store/session';
import { toggleRecordingModal } from '../../store/ui/profilePage';
import { clearErrors } from '../../store/errors';
import RecordingForm from '../forms/RecordingForm';
import ModalContainer from './ModalContainer';
import recordingStyles from '../../css-modules/Recordings.module.css';

const RecordingFormModal = () => {
  const { recordingFormModal } = useSelector((state) => state.ui.profilePage);
  const { recordingFormId, userId } = useSelector((state) => state.session);
  let recInfo = useSelector((state) => {
    if (!recordingFormId) {
      return {
        profileId: state.session.userId,
        recTitle: undefined,
        recURL: undefined,
        recDescription: undefined,
      };
    }
    return {
      profileId: state.session.userId,
      recTitle:
        state.entities.users[state.session.userId].profileInfo.recordings[
          recordingFormId
        ].title,
      recURL: state.entities.recordings[recordingFormId].url,
      recDescription:
        state.entities.users[state.session.userId].profileInfo.recordings[
          recordingFormId
        ].description,
    };
  });

  const dispatch = useDispatch();

  if (recordingFormModal) {
    return (
      <ModalContainer>
        <div
          className={
            recordingFormId
              ? recordingStyles.editModalFormContainer
              : recordingStyles.addModalFormContainer
          }
        >
          <RecordingForm
            id={recordingFormId}
            recInfo={recInfo}
            userId={userId}
          />
        </div>
      </ModalContainer>
    );
  }

  return <></>;
};

export default RecordingFormModal;
