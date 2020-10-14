import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { aboutOn, recordingsOn } from '../store/ui/profilePage';
import ProfileContent from './ProfileContent';


const ProfilePage = ({ match }) => {
    const dispatch = useDispatch();
    const isOwner = useSelector(state => state.session.userId === parseInt(match.params.id));

    const handleAboutClick = () => {
        dispatch(aboutOn());
    }

    const handleRecordingsClick = () => {
        dispatch(recordingsOn());
    }

    return (
        <>
        <h1>Hello!</h1>
        <button onClick={handleAboutClick}>About</button>
        <button onClick={handleRecordingsClick}>Recordings</button>
        <ProfileContent />
        </>
    )
}

export default withRouter(ProfilePage);