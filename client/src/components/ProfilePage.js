import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { aboutOn, recordingsOn } from '../store/ui/profilePage';
import ProfileContent from './ProfileContent';


const ProfilePage = ({ match }) => {
    const dispatch = useDispatch();
    const isOwner = useSelector(state => state.session.userId === parseInt(match.params.id));
    const userProfile = useSelector(state => state.entities.users[parseInt(match.params.id)]);
    console.log(userProfile);
    const handleAboutClick = () => {
        dispatch(aboutOn());
    }

    const handleRecordingsClick = () => {
        dispatch(recordingsOn());
    }

    return (
        <>
        <h1>{userProfile ? userProfile.firstName + " " + userProfile.lastName : ""}</h1>
    <h3>{userProfile ? userProfile.profileInfo.location.split(' ').slice(0, 3).join(" ") : ""}</h3>
        <button onClick={handleAboutClick}>About</button>
        <button onClick={handleRecordingsClick}>Recordings</button>
        <ProfileContent />
        </>
    )
}

export default withRouter(ProfilePage);