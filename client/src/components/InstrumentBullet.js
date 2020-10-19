import React from 'react';
import aboutStyles from '../css-modules/About.module.css';

const InstrumentBullet = ({ instrumentNames }) => {
    return (
        <li><span className={aboutStyles.bulletSpan}>Plays the <span>{(instrumentNames && instrumentNames.length > 2 ?
            instrumentNames.slice(0, instrumentNames.length - 1).join(', ') + ", and " + instrumentNames[instrumentNames.length - 1]
        : instrumentNames && instrumentNames.length === 2 ? instrumentNames.join(' and ') : <></> )}</span></span></li>
    )
}

export default InstrumentBullet;