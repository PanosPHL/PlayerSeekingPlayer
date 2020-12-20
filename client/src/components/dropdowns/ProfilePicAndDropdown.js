import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';
import NavContext from '../../contexts/NavContext';
import navStyles from '../../css-modules/NavComponents.module.css';

const ProfilePicAndDropdown = ({ profileDropdown, notifications }) => {
    const { handleProfileDropdownClick } = useContext(NavContext);
    const user = useSelector(state => state.entities.users[state.session.userId]);

    return (
        <div className={navStyles.profileContainer} onClick={handleProfileDropdownClick}>
            <div styles={{ position: "relative" }}>
            <img className={navStyles.profileImage} src={user ? user.profileInfo.profilePic || '/static/images/default_profile_photo.jpg' : ''} alt='Profile Placeholder' />
            {
                notifications ? <span className={navStyles.picNotificationNumber}>{notifications}</span>
                : <></>
            }
            </div>
            <span className={navStyles.profileDropdownArrow + " " + (profileDropdown ? navStyles.active : navStyles.inactive)}>⯆</span>
            <ProfileDropdown notifications={notifications} userId={user ? user.id : null} className={profileDropdown ? navStyles.dropdownContainer : navStyles.hidden} />
        </div>
    )
}

export default ProfilePicAndDropdown;