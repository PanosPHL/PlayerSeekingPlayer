import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBioModal } from '../store/ui/profilePage';
import aboutStyles from '../css-modules/About.module.css';

const Bio = ({ userProfile }) => {
    const dispatch = useDispatch();

    const handleEditClick = () => {
        dispatch(toggleBioModal());
        document.body.classList.add('noscroll');
    }

    return (
        <div className={aboutStyles.aboutSectionInnerContainer}>
            <button onClick={handleEditClick} className={aboutStyles.editButton}><i className="fas fa-pencil-alt"></i></button>
            <div className={aboutStyles.bio}>
                <h3 className={aboutStyles.aboutSectionHeader}>Biography</h3>
                <p className={aboutStyles.bioContent}>{userProfile ? userProfile.profileInfo.biography : ""}</p>
            </div>
        </div>
    )
}

export default Bio;