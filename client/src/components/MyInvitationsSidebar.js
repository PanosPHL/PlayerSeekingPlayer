import React from 'react'
import invStyles from '../css-modules/MyInvitations.module.css';

const MyInvitationsSidebar = () => {
    return (
        <div className={invStyles.sidebarContainer}>
            <div className={invStyles.sidebarHeaderContainer}>
                <h2 className={invStyles.sidebarHeader}>My Invitations</h2>
                <div className={invStyles.sidebarHeaderButtons}>
                    <button className={invStyles.sidebarHeaderButton}>Received</button>
                    <button className={invStyles.sidebarHeaderButton}>Sent</button>
                </div>
            </div>
        </div>
    )
}


export default MyInvitationsSidebar;