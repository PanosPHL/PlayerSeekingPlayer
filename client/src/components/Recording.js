import React from 'react';
import YouTubePlayer from './YouTubePlayer';

const youtubeRegex = /www\.youtube\.com/g;

const Recording = ({ recording, i }) => {
    const { id, title, description, url } = recording;
    console.log(url);
    return (
        <div>
            <h3>{title}</h3>
            { youtubeRegex.test(url) && url ?
                <YouTubePlayer videoId={url.split('v=')[1]} i={i} width="512" height="288"/> :
            <></>
        }
        <p>{description}</p>
        </div>
    )
}

export default Recording;