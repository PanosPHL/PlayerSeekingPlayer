import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultInvitationMessage, invitationRowDate } from '../utils';
import invStyles from '../css-modules/MyInvitations.module.css';
import { setActiveInvitation } from '../store/session';

const MyInvitationRow = ({ invitation, invitationType }) => {
    const dispatch = useDispatch();
    const otherUser = useSelector(state => {
        if (invitationType === 'received') {
            return state.entities.users[invitation.senderId];
        } else {
            return state.entities.users[invitation.recipientId];
        }
    });
    const band = useSelector(state => state.entities.bands[invitation.bandId]);

    const handleInvitationClick = () => {
        dispatch(setActiveInvitation(invitation.id));
    }

    return (
        <div className={invStyles.invitationRow} onClick={handleInvitationClick}>
            <div className={invStyles.userInfo}>
                <img
                className={invStyles.senderProfilePic}
                src={otherUser.profileInfo.profilePic || '/images/default_profile_photo.jpg'}
                alt={`${otherUser.firstName} ${otherUser.lastName}`} />
                <div className={invStyles.invitationRowTextContainer}>
                    <div className={invStyles.invitationRowNameAndStatusContainer}>
                    <h3 className={invStyles.invitationRowUser}>{otherUser.firstName + " " + otherUser.lastName}</h3>
                    <span
                    className={invStyles.invitationRowStatus + (invitation.status === "Pending" ? " " + invStyles.pendingStatus :
                    invitation.status === "Accepted" ? " " + invStyles.acceptedStatus : invStyles.declinedStatus)}>{invitation.status}</span>
                    </div>
                    <h4 className={invStyles.invitationRowBand}>{band.name}</h4>
                    {
                        invitation.message ?
                        <p className={invStyles.invitationRowMessage}>
                            {invitation.message.slice(0, 62).join('') + '...'}
                            <span className={invStyles.invitationRowDate}>{"  " + invitationRowDate(invitation.createdAt)}</span>
                        </p> :
                        <div className={invStyles.invitationRowMessage}>
                        {defaultInvitationMessage(otherUser, band).split('').slice(0, 62).join('') + '...'}
                        <span className={invStyles.invitationRowDate}>{"  " + invitationRowDate(invitation.createdAt)}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default MyInvitationRow;
