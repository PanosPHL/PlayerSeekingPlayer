import React from 'react';
import aboutStyles from '../css-modules/About.module.css';

const InstrumentBullet = ({ instrumentNames }) => {
    return (
        <li><span className={aboutStyles.bulletSpan}><span>{(instrumentNames && instrumentNames.length > 2 ?
           "Plays the " + instrumentNames.slice(0, instrumentNames.length - 1).join(', ') + ", and " + instrumentNames[instrumentNames.length - 1]
        : instrumentNames && instrumentNames.length === 2 ? "Plays the " + instrumentNames.join(' and ') :
        instrumentNames ? "Plays the " + instrumentNames[0] : "This user has not yet set their instruments" )}</span></span></li>
    )
}

export default InstrumentBullet;