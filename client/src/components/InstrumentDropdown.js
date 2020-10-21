import React, { useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';
import aboutStyles from '../css-modules/About.module.css';

const InstrumentDropdown = ({ instruments, userInstruments, className }) => {
    const { onInstrumentChange } = useContext(OverviewFormContext);
    return (
        <ul className={className}>
            {instruments && instruments.length ? instruments.map((instrument, i) => {
                return (
                    <li className={aboutStyles.dropdownListItem} key={`instrument-${i + 1}`}>
                        <label className={aboutStyles.dropdownLabel} htmlFor={`instrument-${i + 1}`}>{instrument.name}</label>
                        <input type="checkbox"
                        name={`instrument-${i + 1}`}
                        value={instrument.id}
                        onChange={onInstrumentChange}
                        checked={userInstruments.includes(instrument.id) ? true : false}/>
                    </li>
                )
            }) : <></>}
        </ul>
    )
}

export default InstrumentDropdown;