import React from 'react';
import { useSelector } from 'react-redux';
import MyInvitationsSidebar from './MyInvitationsSidebar';
import MyInvitationsContent from './MyInvitationsContent';
import invStyles from '../css-modules/MyInvitations.module.css';

const MyInvitations = () => {
    const invitations = useSelector(state => {
        const { invitationType } = state.session;

        if (invitationType === 'received') {
            return state.entities.users[state.session.userId].receivedInvitations.map((inv) => {
                return state.entities.invitations[inv];
            });
        } else {
            return state.entities.users[state.session.userId].sentInvitations.map((inv) => {
                return state.entities.invitations[inv];
            })
        }
    });
    const activeInvitation = useSelector(state => state.entities.invitations[state.session.activeInvitation]);
    const invitationType = useSelector(state => state.session.invitationType);

    return (
        <div className={invStyles.pageContainer}>
            <MyInvitationsSidebar invitations={invitations} />
            <MyInvitationsContent invitation={activeInvitation} invitationType={invitationType}/>
        </div>
    )
}

export default MyInvitations;