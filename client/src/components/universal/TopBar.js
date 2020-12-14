import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProfileDropdown } from '../../store/ui/navbar';
import ProfilePicAndDropdown from '../dropdowns/ProfilePicAndDropdown';
import SearchIconAndDropdown from '../dropdowns/SearchIconAndDropdown';
import NavContext from '../../contexts/NavContext';
import navStyles from '../../css-modules/NavComponents.module.css';

const TopBar = () => {
    const dispatch = useDispatch();
    const { profileDropdown } = useSelector(state => state.ui.navbar);
    const { userId } = useSelector(state => state.session);
    const unansweredInvitations = useSelector(state => Object.values(state.entities.invitations).filter((invitation) => invitation.recipientId === state.session.userId && invitation.status === "Pending").length)

    const handleProfileDropdownClick = () => {
        dispatch(toggleProfileDropdown());
    }

    const value = {
        handleProfileDropdownClick
    }

    return (
        <NavContext.Provider value={value}>
        <div className={navStyles.nav}>
            <div className={navStyles.navContainer}>
            <div className={navStyles.leftContainer}>
            <Link className={navStyles.logo} to={`/profiles/${userId}`}>
            <h2>Player Seeking Player</h2>
            </Link>
            </div>
            <SearchIconAndDropdown />
            <ProfilePicAndDropdown profileDropdown={profileDropdown} notifications={unansweredInvitations}/>
            </div>
        </div>
        </NavContext.Provider>
    )
}

export default TopBar;