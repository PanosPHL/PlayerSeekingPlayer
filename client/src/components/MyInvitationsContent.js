import React from 'react';
import invStyles from '../css-modules/MyInvitations.module.css';

const MyInvitationsContent = () => {
    return (
        <div className={invStyles.contentContainer}>
            <div className={invStyles.topBarContainer}></div>
            <div className={invStyles.centerContainer}></div>
            <div className={invStyles.bottomBarContainer}></div>
        </div>
    )
}

export default MyInvitationsContent;
