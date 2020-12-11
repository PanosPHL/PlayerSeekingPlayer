import React from 'react'
import { useSelector } from 'react-redux';
import ManageInvitationsForm from '../forms/ManageInvitationsForm';
import ModalContainer from './ModalContainer';

const ManageInvitationsModal = () => {
    const { manageInvitationModal } = useSelector(state => state.ui.uiInvitations);
    const ownedBands = useSelector(state => {
        const res = [];
        for (const band in state.entities.bands) {
            if (state.entities.bands[band].ownerId === state.session.userId) {
                res.push(state.entities.bands[band]);
            }
        }
        return res;
    });
    if (manageInvitationModal) {
        return (
            <ModalContainer>
                <ManageInvitationsForm ownedBands={ownedBands} />
            </ModalContainer>
        );
    }

    return (
        <></>
    );
}

export default ManageInvitationsModal;
