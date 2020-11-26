import React from 'react';
import MyInvitationsSidebar from './MyInvitationsSidebar';
import MyInvitationsContent from './MyInvitationsContent';
import invStyles from '../css-modules/MyInvitations.module.css';

const MyInvitations = () => {
    return (
        <div className={invStyles.pageContainer}>
            <MyInvitationsSidebar />
            <MyInvitationsContent />
        </div>
    )
}

export default MyInvitations;