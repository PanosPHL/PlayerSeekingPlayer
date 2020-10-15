import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileTopSection from './ProfileTopSection';
import ProfileContent from './ProfileContent';
import RecordingFormModal from './RecordingFormModal';


const ProfilePage = ({ match }) => {
    const isOwner = useSelector(state => state.session.userId === parseInt(match.params.id));
    const userProfile = useSelector(state => state.entities.users[parseInt(match.params.id)]);

    return (
        <>
            <ProfileTopSection isOwner={isOwner} userProfile={userProfile} />
            <ProfileContent isOwner={isOwner} userProfile={userProfile} />
        </>
    )
}

export default withRouter(ProfilePage);