import React from 'react';
import YouTube from 'react-youtube';


const youtubeRegex = /www\.youtube\.com/g;

const Recording = ({ recording }) => {
    const { id, title, description, url } = recording;

    return (
        <div>
            { youtubeRegex.test(url) ?
            <YouTube videoId={url.split('v=')[1]}/> :
            <></>
        }
        </div>
    )
}

export default Recording;