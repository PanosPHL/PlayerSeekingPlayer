import React from 'react';
import { useSelector } from 'react-redux';
import { defaultInvitationMessage } from '../utils/defaultInvitationMessage';
import invStyles from '../css-modules/MyInvitations.module.css';
import ReceivedInvitationButtons from './ReceivedInvitationButtons';
import SentInvitationButtons from './SentInvitationButtons';

const MyInvitationsContent = ({ invitation, invitationType }) => {
    const otherUser = useSelector(state => {
        if (!state.session.activeInvitation) {
            return null;
        }

        if (state.session.invitationType === 'received') {
            return state.entities.users[invitation.senderId];
        } else {
            return state.entities.users[invitation.recipientId];
        }
    });
    const band = useSelector(state => {
        if (!state.session.activeInvitation) {
            return null;
        } else {
            return state.entities.bands[invitation.bandId];
        }
    });

    return (
        <div className={invStyles.contentContainer}>
            <div className={invStyles.topBarContainer}></div>
            <div className={invStyles.centerContainer}>
            {
                invitation && invitation.message ?
                <p>{invitation.message}</p> :
                otherUser ?
                defaultInvitationMessage(otherUser, band).split('\n').map((line) => <p>{line}</p>) :
            <p>You currently have no {invitationType} invitations!</p>}
            </div>
            <div className={invStyles.bottomBarContainer}>
                {
                invitationType === 'received' ?
                <ReceivedInvitationButtons /> :
                <SentInvitationButtons />
                }
            </div>
        </div>
    )
}

export default MyInvitationsContent;
