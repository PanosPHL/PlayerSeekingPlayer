import React from 'react';
import invStyles from '../css-modules/MyInvitations.module.css';

const ReceivedInvitationButtons = ({ disabled }) => {
    return (
        <div>
            <button className={disabled ? invStyles.disabledButton : ''}>Accept <i className="fas fa-check"></i></button>
            <button className={disabled ? invStyles.disabledButton : ''}>Decline <i className="fas fa-times"></i></button>
        </div>
    )
}

export default ReceivedInvitationButtons;
