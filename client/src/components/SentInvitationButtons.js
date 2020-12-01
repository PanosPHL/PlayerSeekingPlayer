import React from 'react';
import invStyles from '../css-modules/MyInvitations.module.css';

const SentInvitationButtons = ({ disabled }) => {
    return (
        <div>
            <button className={disabled ? invStyles.disabledButton : ''}>Delete <i className="fas fa-trash"></i></button>
        </div>
    )
}

export default SentInvitationButtons;