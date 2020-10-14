import React from 'react';
import YouTubePlayer from './YouTubePlayer';

const youtubeRegex = /www\.youtube\.com/g;

const Recording = ({ recording, i }) => {
    const { id, title, description, url } = recording;

    return (
        <div>
            { youtubeRegex.test(url) ?
                <YouTubePlayer videoId={url.split('v=')[1]} i={i} width="512" height="288"/> :
            <></>
        }
        </div>
    )
}

export default Recording;