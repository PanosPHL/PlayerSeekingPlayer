import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAndAddRecording, putAndUpdateRecording } from '../store/recordings';
import { setErrors, clearErrors } from '../store/errors';
import { toggleRecordingModal } from '../store/ui/profilePage';
import Errors from './Errors';
import recordingStyles from '../css-modules/Recordings.module.css';


const RecordingForm = ({ id, recInfo: { profileId, recTitle, recDescription, recURL } }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(id ? recTitle : '');
    const [url, setUrl] = useState(id ? recURL : '');
    const [description, setDescription] = useState(id ? recDescription : '');

    const errors = useSelector(state => state.errors);

    useEffect(() => {
        dispatch(clearErrors());
    }, [title, url, description, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;

        if (!id) {
            res = await dispatch(postAndAddRecording(profileId, url, title, description));
            console.log(res);
        } else {
            res = await dispatch(putAndUpdateRecording(profileId, id, url, title, description));
        }

        if (res.ok) {
            dispatch(toggleRecordingModal());
            document.body.classList.remove('noscroll');
            return;
        }

        dispatch(setErrors(res.data.errors));
        return;
    }

    return (
        <>
        <h2 className={recordingStyles.modalFormTitle}>{ id ? "Edit Recording" : "Add Recording" }</h2>
        { errors && errors.length ?
        <Errors errors={errors}
        className={recordingStyles.recordingErrors}
        divStyle={id ? recordingStyles.editRecordingErrorWrapper : recordingStyles.addRecordingErrorWrapper} /> : <></> }
        <form className={ id ? recordingStyles.editRecordingForm : recordingStyles.addRecordingForm} method="" action="" onSubmit={handleSubmit}>
            <div className="form-control-group">
            <p>
                <label className="labels" htmlFor="title">Title</label>
            </p>
            <input className="form-control" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            { id ? <></> :
            <div className="form-control-group">
            <p>
                <label className="labels" htmlFor="url">URL</label>
            </p>
            <input className="form-control" type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div> }
            <div className="form-control-group">
            <p>
                <label className="labels" htmlFor="description">Description</label>
            </p>
            <textarea className={recordingStyles.descriptionForm} cols="55" rows="8" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button className={recordingStyles.submitButton}>{id ? "Edit Recording" : "Add Recording"}</button>
        </form>
        </>
    )
}

export default RecordingForm;