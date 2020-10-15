import React, { useState, useEffect, useRef } from 'react';
import styles from '../css-modules/YouTubePlayer.module.css';


const YouTubePlayer = ({ videoId, i, height, width }) => {
    const [loading, setLoading] = useState(true);
    const player = useRef(null);

    useEffect(() => {
        player.current = new window.YT.Player(`player-${i}`, {
            videoId: videoId,
            playerVars: {
                origin: 'http://localhost:3000'
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }, [i, videoId])

    const onPlayerReady = (event) => {
        setLoading(false);
    }

    return (
        <iframe
        title={`Recording ${i}`}
        className={loading ? styles.loadingPlayer : styles.activePlayer}
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        frameBorder="0"
        id={`player-${i}`}></iframe>
    )
}

export default YouTubePlayer;