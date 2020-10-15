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
        <form method="" action="" onSubmit={handleSubmit}>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            { id ? <></> : <input type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />}
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>{id ? "Edit Recording" : "Add Recording"}</button>
        </form>
    )
}

export default RecordingForm;