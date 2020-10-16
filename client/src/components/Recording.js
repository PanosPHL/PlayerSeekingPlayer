import React from 'react';
import { useDispatch } from 'react-redux'
import { setRecordingFormId } from '../store/session';
import { toggleRecordingModal } from '../store/ui/profilePage';
import YouTubePlayer from './YouTubePlayer';


const Recording = ({ recording, i, isOwner }) => {
    const dispatch = useDispatch();
    const { id, title, description, url } = recording;
    const youtubeRegex = /https:\/\/www\.youtube\.com/g;

    const handleEditClick = () => {
        dispatch(toggleRecordingModal());
        dispatch(setRecordingFormId(id));
        document.body.classList.add('noscroll');
    }

    return (
        <div style={{
            gridRow: `${i} / ${i + 1}`,
            margin: "0 auto"
        }}>
            <h3>{title}</h3>
            { isOwner ? <button onClick={handleEditClick}>
            <i className="far fa-edit"></i>
            </button> : <></>}
        <div style={{display: "flex"}}>
            { youtubeRegex.test(url) ?
                <YouTubePlayer videoId={url.split('v=')[1]} i={i} width="640" height="360"/> :
            <></>
        }
        <p>{description}</p>
        </div>
        </div>
    )
}

export default Recording;