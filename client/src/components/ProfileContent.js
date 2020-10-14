import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aboutOn, recordingsOn } from '../store/ui/profilePage';
import About from './About';
import Recordings from './Recordings';

const ProfileContent = ({ isOwner, userProfile }) => {
    const dispatch = useDispatch();
    const { about, recordings } = useSelector(state => state.ui.profilePage);

    useEffect(() => {
        dispatch(aboutOn())
    }, [])

    return (
        <>
        {
            about ? <About isOwner={isOwner} userProfile={userProfile}/> :
            <Recordings isOwner={isOwner} userProfile={userProfile}/>
        }
        </>
    )
}

export default ProfileContent;