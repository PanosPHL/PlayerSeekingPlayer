import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAndAddRecording, putAndUpdateRecording } from '../store/recordings';
import authStyles from '../css-modules/AuthPages.module.css';
import recordingStyles from '../css-modules/Recordings.module.css';


const RecordingForm = ({ id, recInfo: { profileId, recTitle, recDescription, recURL } }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(id ? recTitle : '');
    const [url, setUrl] = useState(id ? recURL : '');
    const [description, setDescription] = useState(id ? recDescription : '');
    console.log(id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;

        if (!id) {
            res = await dispatch(postAndAddRecording(profileId, url, title, description));
        } else {
            res = await dispatch(putAndUpdateRecording(profileId, id, url, title, description));
        }

        if (res.ok) {
            return;
        }
    }

    return (
        <>
        <h2 className={recordingStyles.modalFormTitle}>{ id ? "Edit Recording" : "Add Recording" }</h2>
        <form className={ id ? recordingStyles.editRecordingForm : recordingStyles.addRecordingForm} method="" action="" onSubmit={handleSubmit}>
            <div className="form-control-group">
            <p>
                <label className={authStyles.labels} htmlFor="title">Title</label>
            </p>
            <input className="form-control" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            { id ? <></> :
            <div className="form-control-group">
            <p>
                <label className={authStyles.labels} htmlFor="url">URL</label>
            </p>
            <input className="form-control" type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div> }
            <div className="form-control-group">
            <p>
                <label className={authStyles.labels} htmlFor="description">Description</label>
            </p>
            <textarea className={recordingStyles.descriptionForm} cols="55" rows="8" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button className={recordingStyles.submitButton}>{id ? "Edit Recording" : "Add Recording"}</button>
        </form>
        </>
    )
}

export default RecordingForm;