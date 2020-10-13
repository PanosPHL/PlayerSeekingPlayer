import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileContent from './ProfileContent';


const ProfilePage = ({ match }) => {
    const dispatch = useDispatch();
    const isOwner = useSelector(state => state.session.userId === parseInt(match.params.id));

    const handleAboutClick = () => {

    }

    const handleRecordingsClick = () => {

    }

    return (
        <>
        <h1>Hello!</h1>
        <button>About</button>
        <button>Recordings</button>
        <ProfileContent />
        </>
    )
}

export default withRouter(ProfilePage);