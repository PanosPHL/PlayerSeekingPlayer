import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAndDeleteInvitation } from '../../store/invitations';
import invStyles from '../../css-modules/MyInvitations.module.css';
import { setActiveInvitation } from '../../store/session';

const SentInvitationButtons = ({ invitationId, disabled, invitations }) => {
    const dispatch = useDispatch()
    const handleDeleteClick = async () => {
        const res = await dispatch(fetchAndDeleteInvitation(invitationId));

        if (res.ok) {
            if (invitations.length) {
                dispatch(setActiveInvitation(invitations[0].id));
            }
        }
    }
    return (
        <div>
            <button onClick={handleDeleteClick} className={invStyles.deleteInvitationButton + " " + invStyles.invitationButton + (disabled ? " " + invStyles.disabledSentButton : '')}>Delete <i className="fas fa-trash"></i></button>
        </div>
    )
}

export default SentInvitationButtons;
