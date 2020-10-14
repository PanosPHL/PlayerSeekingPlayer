import React, { useState, useEffect } from 'react';
import styles from '../css-modules/YouTubePlayer.module.css';


const YouTubePlayer = ({ videoId, i, height, width }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        setPlayer(new window.YT.Player(`player-${i}`, {
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        }));
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
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://localhost:3000`}
        frameBorder="0"
        id={`player-${i}`}></iframe>
    )
}

export default YouTubePlayer;