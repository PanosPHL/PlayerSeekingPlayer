import React from 'react';
import { useDispatch } from 'react-redux';
import { putAndUpdateInvitation } from '../store/invitations';
import invStyles from '../css-modules/MyInvitations.module.css';

const ReceivedInvitationButtons = ({ invitationId, disabled }) => {
    const dispatch = useDispatch();
    const handleAccept = async () => {
        await dispatch(putAndUpdateInvitation(invitationId, "Accepted"));
    }

    const handleDecline = async () => {
        await dispatch(putAndUpdateInvitation(invitationId, "Declined"));
    }

    return (
        <div className={invStyles.invitationButtonContainer}>
            <button onClick={handleAccept} className={invStyles.acceptInvitationButton + " " + invStyles.invitationButton + (disabled ? " " + invStyles.disabledReceivedButton : '')}>Accept <i className="fas fa-check"></i></button>
            <button onClick={handleDecline} className={invStyles.declineInvitationButton + " " + invStyles.invitationButton + (disabled ? " " + invStyles.disabledReceivedButton : '')}>Decline <i className="fas fa-times"></i></button>
        </div>
    )
}

export default ReceivedInvitationButtons;
