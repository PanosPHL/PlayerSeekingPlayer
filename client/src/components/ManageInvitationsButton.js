import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleManageInvitationModal } from '../store/ui/invitations';

export const ManageInvitationsButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleManageInvitationModal());
    }

    return (
        <button onClick={handleClick}>Manage Invitations</button>
    );
}

export default ManageInvitationsButton
