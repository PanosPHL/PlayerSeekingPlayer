import React from 'react';
import { useSelector } from 'react-redux';
import About from './About';
import Recordings from './Recordings';

const ProfileContent = ({ isOwner, userProfile }) => {
    const { about, recordings } = useSelector(state => state.ui.profilePage);
    return (
        <>
        {
            about ? <About isOwner={isOwner} userProfile={userProfile}/> :
            <Recordings isOwner={isOwner} userProfile={userProfile} className={recordings ? "" : "actuallyHidden"}/>
        }
        </>
    )
}

export default ProfileContent;