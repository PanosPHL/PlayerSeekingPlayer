import React from 'react';
import invStyles from '../css-modules/MyInvitations.module.css';

const ReceivedInvitationButtons = ({ disabled }) => {
    return (
        <div className={invStyles.invitationButtonContainer}>
            <button className={invStyles.acceptInvitationButton + " " + invStyles.invitationButton + (disabled ? " " + invStyles.disabledButton : '')}>Accept <i className="fas fa-check"></i></button>
            <button className={invStyles.declineInvitationButton + " " + invStyles.invitationButton + (disabled ? " " + invStyles.disabledButton : '')}>Decline <i className="fas fa-times"></i></button>
        </div>
    )
}

export default ReceivedInvitationButtons;
