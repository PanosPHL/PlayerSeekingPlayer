import React, { useContext, useEffect, useRef } from 'react';
import RecordingContext from '../../contexts/RecordingContext';
import SearchRecordingContext from '../../contexts/SearchRecordingContext';
import LearnMoreContext from '../../contexts/LearnMoreContext';


const YouTubePlayer = ({ videoId, i, height, width, type }) => {
    const {
        set: {
            setLoading
        }
    } = useContext(type === 'profile' ? RecordingContext :  type === 'search' ? SearchRecordingContext : LearnMoreContext);
    const player = useRef(null);

    useEffect(() => {
        const onPlayerReady = () => {
            setLoading(false);
        }

        player.current = new window.YT.Player(`player-${i}`, {
            videoId: videoId,
            playerVars: {
                origin: process.env.NODE_ENV === 'production' ? 'https://player-seeking-player.herokuapp.com' : 'http://localhost:3000'
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }, [i, videoId, setLoading])

    return (
        <iframe
        title={`Recording ${i}`}
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        frameBorder="0"
        id={`player-${i}`}></iframe>
    )
}

export default YouTubePlayer;