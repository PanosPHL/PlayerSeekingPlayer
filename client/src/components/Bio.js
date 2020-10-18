import React from 'react';
import aboutStyles from '../css-modules/About.module.css';

const Bio = ({ userProfile }) => {
    return (
        <div className={aboutStyles.bioContainer}>
                    <div className={aboutStyles.bio}>
                    <h3>Biography</h3>
                    <p>{userProfile ? userProfile.profileInfo.biography : ""}</p>
                    </div>
                </div>
    )
}

export default Bio;