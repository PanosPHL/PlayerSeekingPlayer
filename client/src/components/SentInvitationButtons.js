import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndDeleteInvitation } from '../store/invitations';
import invStyles from '../css-modules/MyInvitations.module.css';

const SentInvitationButtons = ({ disabled }) => {
    const dispatch = useDispatch()
    const { activeInvitation } = useSelector(state => state.session);
    const handleDeleteClick = async () => {
        await dispatch(fetchAndDeleteInvitation(activeInvitation));
    }
    return (
        <div>
            <button onClick={handleDeleteClick} className={invStyles.deleteInvitationButton + " " + invStyles.invitationButton + (disabled ? " " + invStyles.disabledSentButton : '')}>Delete <i className="fas fa-trash"></i></button>
        </div>
    )
}

export default SentInvitationButtons;
