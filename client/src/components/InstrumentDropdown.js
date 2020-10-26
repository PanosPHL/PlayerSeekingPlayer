import React from 'react';
import Checkbox from './Checkbox';
import aboutStyles from '../css-modules/About.module.css';

const InstrumentDropdown = ({ instruments, userInstruments, className }) => {
    return (
        <ul className={className}>
            {instruments && instruments.length ? instruments.map((instrument, i) => {
                let includes = userInstruments.includes(instrument.id);
                return (
                    <li className={aboutStyles.dropdownListItem} key={`instrument-${i + 1}`}>
                        <label className={aboutStyles.dropdownLabel} htmlFor={`instrument-${i + 1}`}>{instrument.name}</label>
                        <Checkbox name={`instrument-${i + 1}`}
                        initValue={instrument.id}
                        initCheck={includes}
                        type="overviewInstrument"/>
                    </li>
                )
            }) : <></>}
        </ul>
    )
}

export default InstrumentDropdown;