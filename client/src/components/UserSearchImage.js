import React from 'react';
import { Link } from 'react-router-dom'
import searchStyles from '../css-modules/Search.module.css';

const UserSearchImage = ({ userId }) => {
    return (
        <Link to={`/profiles/${userId}`}>
        <div className={searchStyles.pictureContainer}>
            <img className={searchStyles.picture}
            src='https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1218408229?b=1&k=6&m=1218408229&s=612x612&w=0&h=ljIOZzztvumhkaB5d9xLPuZ8cvckG527XCWZIKTCT0k=' alt='Profile' />
            <div></div>
        </div>
        </Link>
    )
}

export default UserSearchImage;