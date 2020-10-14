import React from 'react';
import { useSelector } from 'react-redux';
import About from './About';
import Recordings from './Recordings';

const ProfileContent = () => {
    const { about, recordings } = useSelector(state => state.ui.profilePage);
    return (
        <>
        {
            about ? <About /> :
            recordings ? <Recordings /> :
            <></>
        }
        </>
    )
}

export default ProfileContent;