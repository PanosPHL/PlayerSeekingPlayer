import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { aboutOn } from '../store/ui/profilePage';
import About from './About';
import Recordings from './Recordings';

const ProfileContent = ({ isOwner, userProfile, about, recordings, instruments, styles }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(aboutOn())
    }, [dispatch])

    return (
        <>
        {
            about ? <About isOwner={isOwner} userProfile={userProfile} instruments={instruments} styles={styles}/> :
           recordings ?  <Recordings isOwner={isOwner} userProfile={userProfile}/> : <></>
        }
        </>
    )
}

export default ProfileContent;