import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAndAddRecording } from '../store/recordings';


const RecordingForm = ({ id, recInfo: { profileId, recTitle, recDescription, recURL } }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(id ? recTitle : '');
    const [url, setUrl] = useState(id ? recURL : '');
    const [description, setDescription] = useState(id ? recDescription : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(postAndAddRecording(profileId, url, title, description));
    }

    return (
        <>
        <h2>{ id ? "Edit Recording" : "Add Recording" }</h2>
        <form method="" action="" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="title">Title</label>
            </p>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            { id ? <></> :
            <>
            <p>
                <label htmlFor="url">URL</label>
            </p>
            <input type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </> }
            <p>
                <label htmlFor="description">Description</label>
            </p>
            <textarea cols="60" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>{id ? "Edit Recording" : "Add Recording"}</button>
        </form>
        </>
    )
}

export default RecordingForm;