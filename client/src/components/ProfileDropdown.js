import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/session';
import navStyles from '../css-modules/NavComponents.module.css';


const ProfileDropdown = ({ className, history, userId }) => {
    const dispatch = useDispatch();

    const handleLogoutClick = async () => {
        const res = await dispatch(logout());
        if (res.ok) {
            history.replace('/');
            return;
        }
    }

    return (
        <div className={className}>
        <ul className={navStyles.profileDropdown}>
            <Link className={navStyles.dropdownLink} to={`/profiles/${userId}`}>
            <li className={navStyles.dropdownListItem}>My Profile</li>
            </Link>
            <Link className={navStyles.dropdownLink} to='/my-bands'>
                <li className={navStyles.dropdownListItem}>Bands</li>
            </Link>
            <li className={navStyles.dropdownListItem} onClick={handleLogoutClick}>Logout</li>
        </ul>
        </div>
    )
}

export default withRouter(ProfileDropdown);