import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleManageInvitationModal } from '../store/ui/invitations';

export const ManageInvitationsButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleManageInvitationModal());
        document.body.classList.add('noscroll');
    }

    return (
        <button onClick={handleClick}>Manage Invitations</button>
    );
}

export default ManageInvitationsButton
