import React, { useState } from 'react';


const RecordingForm = ({ id, recInfo: { recTitle, recDescription, recURL } }) => {
    const [title, setTitle] = useState(id ? recTitle : '');
    const [url, setUrl] = useState(id ? recURL : '');
    const [description, setDescription] = useState(id ? recDescription : '');

    const handleSubmit = () => {

    }

    return (
        <form method="" action="">
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            { id ? <></> : <input type="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />}
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>{id ? "Edit Recording" : "Add Recording"}</button>
        </form>
    )
}

export default RecordingForm;