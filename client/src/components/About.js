import React from 'react';
import profStyles from '../css-modules/ProfilePage.module.css';


const About = ({ userProfile, instruments }) => {
    const age = userProfile ? Math.abs(new Date(new Date(userProfile.dateOfBirth).getTime() - Date.now()).getUTCFullYear() - 1969) : null;
    return (
        <div className={profStyles.aboutContainer}>
            <div className={profStyles.aboutHeaderContainer}>
                <h2 className={profStyles.aboutHeader}>About</h2>
            </div>
            <div>
                <h4>Age: </h4><span>{age ? age.toString() : ""}</span>
                <h4>Instruments: </h4><span>{instruments && instruments.length ? instruments.map((instrument) => instrument ? instrument.name : "").join(', ') : ""}</span>
                <h4>Biography:</h4>
                <p>{userProfile ? userProfile.profileInfo.biography : ""}</p>
            </div>
        </div>
    )
}

export default About;