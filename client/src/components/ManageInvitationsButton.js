import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleManageInvitationModal } from '../store/ui/invitations';
import invStyles from '../css-modules/MyInvitations.module.css';

export const ManageInvitationsButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleManageInvitationModal());
    }

    return (
        <button className={invStyles.manageButton} onClick={handleClick}>Send an Invitation <i className="far fa-envelope"></i></button>
    );
}

export default ManageInvitationsButton
