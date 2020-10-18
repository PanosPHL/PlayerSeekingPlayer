import React from 'react';
import { useSelector } from 'react-redux';
import Overview from './Overview';
import Bio from './Bio';
import AboutSectionPicker from './AboutSectionPicker';
import aboutStyles from '../css-modules/About.module.css';


const About = ({ userProfile, instruments, styles }) => {
    const age = userProfile ? Math.abs(new Date(new Date(userProfile.dateOfBirth).getTime() - Date.now()).getUTCFullYear() - 1969) : null;
    const instrumentNames = instruments && instruments.length ? instruments.map((instrument) => instrument ? instrument.name : "") : null;
    const styleNames = styles && styles.length ? styles.map((style) => style ? style.name : "") : null;

    const { about: { overview, biography } } = useSelector(state => state.ui.profilePage);

    return (
        <div className={aboutStyles.aboutContainer}>
            <div className={aboutStyles.aboutHeaderContainer}>
                <h2 className={aboutStyles.aboutHeader}>About</h2>
            </div>
            <AboutSectionPicker />
            {
                overview ? <Overview age={age} instrumentNames={instrumentNames} styleNames={styleNames} userProfile={userProfile} /> :
                biography ? <Bio userProfile={userProfile} /> : <></>
            }
            </div>
    )
}

export default About;