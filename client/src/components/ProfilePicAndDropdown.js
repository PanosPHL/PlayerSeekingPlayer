import React, { useContext } from 'react';
import ProfileDropdown from './ProfileDropdown';
import NavContext from '../contexts/NavContext';
import navStyles from '../css-modules/NavComponents.module.css';

const ProfilePicAndDropdown = ({ profileDropdown }) => {
    const { handleProfileDropdownClick } = useContext(NavContext)

    return (
        <div className={navStyles.profileContainer} onClick={handleProfileDropdownClick}>
            <img className={navStyles.profileImage} src='https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1218408229?b=1&k=6&m=1218408229&s=612x612&w=0&h=ljIOZzztvumhkaB5d9xLPuZ8cvckG527XCWZIKTCT0k=' alt='Profile Placeholder' />
            <span className={navStyles.profileDropdownArrow + " " + (profileDropdown ? navStyles.active : navStyles.inactive)}>⯆</span>
            <ProfileDropdown className={profileDropdown ? navStyles.dropdownContainer : navStyles.hidden} />
        </div>
    )
}

export default ProfilePicAndDropdown;