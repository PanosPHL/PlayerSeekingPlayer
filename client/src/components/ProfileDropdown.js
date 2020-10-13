import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/session';
import navStyles from '../css-modules/NavComponents.module.css';


const ProfileDropdown = ({ className, history }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.userId);

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
            <Link to={`/profiles/${userId}`}>
            <li className={navStyles.dropdownListItem}>My Profile</li>
            </Link>
            <li className={navStyles.dropdownListItem} onClick={handleLogoutClick}>Logout</li>
        </ul>
        </div>
    )
}

export default withRouter(ProfileDropdown);