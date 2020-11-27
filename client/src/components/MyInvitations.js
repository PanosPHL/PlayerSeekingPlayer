import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveInvitation } from '../store/session';
import MyInvitationsSidebar from './MyInvitationsSidebar';
import MyInvitationsContent from './MyInvitationsContent';
import invStyles from '../css-modules/MyInvitations.module.css';

const MyInvitations = () => {
    const dispatch = useDispatch();
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

    useEffect(() => {
        if (invitations.length) {
            dispatch(setActiveInvitation(invitations[0].id));
        }
    }, [activeInvitation, invitations, dispatch])

    return (
        <div className={invStyles.pageContainer}>
            <MyInvitationsSidebar invitations={invitations} />
            <MyInvitationsContent invitation={activeInvitation} invitationType={invitationType}/>
        </div>
    )
}

export default MyInvitations;