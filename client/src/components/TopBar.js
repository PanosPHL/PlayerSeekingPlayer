import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProfileDropdown } from '../store/ui/navbar';
import navStyles from '../css-modules/NavComponents.module.css';

const TopBar = () => {
    const dispatch = useDispatch();
    const { profileDropdown } = useSelector(state => state.ui.navbar);

    const handleDropdownClick = () => {
        dispatch(toggleProfileDropdown());
    }

    return (
        <div className={navStyles.nav}>
            <div className={navStyles.navContainer}>
            <div className={navStyles.leftContainer}>
            <Link>
            <h2>Player Seeking Player</h2>
            </Link>
            </div>
            <div className={navStyles.rightContainer}>
                <img className={navStyles.profileImage} src='https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1218408229?b=1&k=6&m=1218408229&s=612x612&w=0&h=ljIOZzztvumhkaB5d9xLPuZ8cvckG527XCWZIKTCT0k=' alt='Profile Picture Placeholder'/>
                <span className={navStyles.profileDropdownArrow + " " + (profileDropdown ? navStyles.active : navStyles.inactive)}>⯆</span>
            </div>
            </div>
        </div>
    )
}

export default TopBar;