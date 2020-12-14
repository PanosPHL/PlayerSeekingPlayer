import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeInvitationType } from '../../../store/session';
import MyInvitationRow from './MyInvitationRow';
import invStyles from '../../../css-modules/MyInvitations.module.css';

const MyInvitationsSidebar = ({ invitations }) => {
    const dispatch = useDispatch();
    const { invitationType } = useSelector(state => state.session);

    const handleReceivedClick = () => {
        dispatch(changeInvitationType('received'));
    }

    const handleSentClick = () => {
        dispatch(changeInvitationType('sent'));
    }

    return (
        <div className={invStyles.sidebarContainer}>
            <div className={invStyles.sidebarHeaderContainer}>
                <h2 className={invStyles.sidebarHeader}>My Invitations</h2>
                <div className={invStyles.sidebarHeaderButtons}>
                    <button
                    onClick={handleReceivedClick}
                    className={invStyles.sidebarHeaderButton + (invitationType === 'received' ? " " + invStyles.activeButton : '')}>Received</button>
                    <button
                    onClick={handleSentClick}
                    className={invStyles.sidebarHeaderButton + (invitationType === 'sent' ? " " + invStyles.activeButton : '')}>Sent</button>
                </div>
            </div>
            <div className={invStyles.invitationRowContainer}>
                {
                    invitations.map((invitation, i) => <MyInvitationRow key={`invitation-row-${i + 1}`} invitation={invitation} invitationType={invitationType} />)
                }
            </div>
        </div>
    )
}


export default MyInvitationsSidebar;