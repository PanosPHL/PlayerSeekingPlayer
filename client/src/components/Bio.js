import React from 'react';
import aboutStyles from '../css-modules/About.module.css';

const Bio = ({ userProfile }) => {
    return (
        <div className={aboutStyles.aboutSectionInnerContainer}>
            <button className={aboutStyles.editButton}><i className="fas fa-pencil-alt"></i></button>
            <div className={aboutStyles.bio}>
                <h3 className={aboutStyles.aboutSectionHeader}>Biography</h3>
                <p className={aboutStyles.bioContent}>{userProfile ? userProfile.profileInfo.biography : ""}</p>
            </div>
        </div>
    )
}

export default Bio;