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
        <div>
            <h3>{title}</h3>
            { isOwner ? <button onClick={handleEditClick}>
            <i className="far fa-edit"></i>
            </button> : <></>}
            { youtubeRegex.test(url) ?
                <YouTubePlayer videoId={url.split('v=')[1]} i={i} width="512" height="288"/> :
            <></>
        }
        <p>{description}</p>
        </div>
    )
}

export default Recording;