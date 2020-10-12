import React from 'react';
import navStyles from '../css-modules/NavComponents.module.css';


const ProfileDropdown = ({ className }) => {
    return (
        <div className={className}>
        <ul className={navStyles.profileDropdown}>
            <li className={navStyles.dropdownListItem}>My Profile</li>
            <li className={navStyles.dropdownListItem}>Logout</li>
        </ul>
        </div>
    )
}

export default ProfileDropdown;