import React from 'react';
import { Link } from 'react-router-dom'
import searchStyles from '../css-modules/Search.module.css';

const UserSearchImage = ({ user }) => {
    return (
        <Link to={`/profiles/${user ? user.id : null}`}>
        <div className={searchStyles.pictureContainer}>
            <img className={searchStyles.picture}
            src={user && user.profileInfo.profilePic ? user.profileInfo.profilePic : '/images/default_profile_photo.jpg'} alt='Profile' />
            <div></div>
        </div>
        </Link>
    )
}

export default UserSearchImage;