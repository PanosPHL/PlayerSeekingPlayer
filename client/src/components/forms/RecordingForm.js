import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postAndAddRecording,
  putAndUpdateRecording,
} from '../../store/recordings';
import { setErrors, clearErrors } from '../../store/errors';
import { toggleRecordingModal } from '../../store/ui/profilePage';
import { setRecordingFormId } from '../../store/session';
import { removeRecording } from '../../store/recordings';
import Errors from '../universal/Errors';
import recordingStyles from '../../css-modules/Recordings.module.css';

const RecordingForm = ({
  id,
  userId,
  recInfo: { profileId, recTitle, recDescription, recURL },
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(id ? recTitle : '');
  const [url, setUrl] = useState(id ? recURL : '');
  const [description, setDescription] = useState(id ? recDescription : '');

  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(clearErrors());
  }, [title, url, description, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;

    if (!id) {
      res = await dispatch(
        postAndAddRecording(profileId, url, title, description)
      );
    } else {
      res = await dispatch(
        putAndUpdateRecording(profileId, id, url, title, description)
      );
    }

    if (res.ok) {
      dispatch(toggleRecordingModal());
      return;
    }

    dispatch(setErrors(res.data.errors));
  };

  const handleDeleteClick = () => {
    dispatch(removeRecording(id, userId));
    dispatch(toggleRecordingModal());
    dispatch(setRecordingFormId(null));
    dispatch(clearErrors());
  };

  const handleCloseClick = () => {
    dispatch(toggleRecordingModal());
    dispatch(setRecordingFormId(null));
    dispatch(clearErrors());
  };

  return (
    <>
      <div className={recordingStyles.editTitleAndButtonContainer}>
        <h2 className={recordingStyles.modalFormTitle}>
          {id ? 'Edit Recording' : 'Add Recording'}
        </h2>
        <button
          className={recordingStyles.modalFormClose}
          onClick={handleCloseClick}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      {errors && errors.length ? (
        <Errors
          errors={errors}
          className={recordingStyles.recordingErrors}
          divStyle={
            id
              ? recordingStyles.editRecordingErrorWrapper
              : recordingStyles.addRecordingErrorWrapper
          }
        />
      ) : (
        <></>
      )}
      <form
        className={
          id
            ? recordingStyles.editRecordingForm
            : recordingStyles.addRecordingForm
        }
        onSubmit={handleSubmit}
      >
        <div className="form-control-group">
          <p>
            <label className="labels" htmlFor="title">
              Title<span className="redText">*</span>
            </label>
          </p>
          <input
            placeholder="i.e. Mary Had A Little Lamb"
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {id ? (
          <></>
        ) : (
          <div className="form-control-group">
            <p>
              <label className="labels" htmlFor="url">
                URL<span className="redText">*</span>
              </label>
            </p>
            <input
              placeholder="https://www.youtube.com/watch?v=o_oQ52sZCTE"
              className="form-control"
              type="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        )}
        <div className="form-control-group">
          <p>
            <label className="labels" htmlFor="description">
              Description
            </label>
          </p>
          <textarea
            placeholder="Add any additional context to your recording here!"
            className={recordingStyles.descriptionForm}
            rows="8"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {id ? (
          <>
            <div className={recordingStyles.editSubmitContainer}>
              <button
                onClick={handleDeleteClick}
                className={recordingStyles.deleteRecordingButton}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button type="submit" className={recordingStyles.submitButton}>
                {id ? 'Edit Recording' : 'Add Recording'}
              </button>
            </div>
            <span className={recordingStyles.editRequiredText}>
              <span className="redText">*</span> Required field
            </span>
          </>
        ) : (
          <div className={recordingStyles.newSubmitContainer}>
            <span className={recordingStyles.newRequiredText}>
              <span className="redText">*</span> Required field
            </span>
            <button type="submit" className={recordingStyles.submitButton}>
              {id ? 'Edit Recording' : 'Add Recording'}
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default RecordingForm;
