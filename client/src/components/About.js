import React from 'react';
import aboutStyles from '../css-modules/About.module.css';


const About = ({ userProfile, instruments, styles }) => {
    const age = userProfile ? Math.abs(new Date(new Date(userProfile.dateOfBirth).getTime() - Date.now()).getUTCFullYear() - 1969) : null;
    const instrumentNames = instruments && instruments.length ? instruments.map((instrument) => instrument ? instrument.name : "") : null;
    const styleNames = styles && styles.length ? styles.map((style) => style ? style.name : "") : null;

    return (
        <div className={aboutStyles.aboutContainer}>
            <div className={aboutStyles.aboutHeaderContainer}>
                <h2 className={aboutStyles.aboutHeader}>About</h2>
            </div>
            <div>
                <div>
                    <h3>Player Overview</h3>
                <p>
                <span>{age ? age.toString() + " years old" : ""}</span>
                </p>
                <p>
                <span>{"Plays the " + (instrumentNames && instrumentNames.length > 1 ?
                     instrumentNames.slice(0, instrumentNames.length - 1).join(', ') + " , and" + instrumentNames[instrumentNames.length - 1]
                    : instrumentNames ? instrumentNames[0] : <></>)}</span>
                </p>
                <p>
                <span>Specializes in {styleNames && styleNames.length > 1 ?
                    styleNames.slice(0, styleNames.length - 1).join(', ') + " , and" + styleNames[styleNames.length - 1]
                    : styleNames ? styleNames[0] : <></>}</span>
                </p>
                </div>
                <div>
                <h3>Biography:</h3>
                <p>{userProfile ? userProfile.profileInfo.biography : ""}</p>
                </div>
            </div>
        </div>
    )
}

export default About;