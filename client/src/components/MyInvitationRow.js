import React from 'react';
import { useSelector } from 'react-redux';
import { defaultInvitationMessage } from '../utils/defaultInvitationMessage';
import invStyles from '../css-modules/MyInvitations.module.css';

const MyInvitationRow = ({ invitation, invitationType }) => {
    const otherUser = useSelector(state => {
        if (invitationType === 'received') {
            return state.entities.users[invitation.senderId];
        } else {
            return state.entities.users[invitation.recipientId];
        }
    });
    const band = useSelector(state => state.entities.bands[invitation.bandId]);
    return (
        <div>
            <div className={invStyles.userInfo}>
                <img
                className={invStyles.senderProfilePic}
                src={otherUser.profileInfo.profilePic || '/images/default_profile_photo.jpg'}
                alt={`${otherUser.firstName} ${otherUser.lastName}`} />
                <div>
                    <h3>{otherUser.firstName + " " + otherUser.lastName}</h3>
                    <h4>{band.name}</h4>
                    {
                        invitation.message ?
                        <p>{invitation.message}</p> :
                        <div>
                        {defaultInvitationMessage(otherUser, band).split('').slice(0, 66).join('') + '...'}
                        </div>

                    }
                </div>
            </div>
        </div>
    )
};

export default MyInvitationRow;
