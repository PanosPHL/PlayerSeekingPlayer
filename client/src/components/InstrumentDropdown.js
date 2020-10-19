import React, { useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';

const InstrumentDropdown = ({ instruments, userInstruments, className }) => {
    const { onInstrumentChange } = useContext(OverviewFormContext);
    return (
        <div className={className} style={{display: "flex"}}>
            {instruments && instruments.length ? instruments.map((instrument, i) => {
                return (
                    <div key={`instrument-${i + 1}`}>
                        <label htmlFor={`instrument-${i + 1}`}>{instrument.name}</label>
                        <input type="checkbox"
                        name={`instrument-${i + 1}`}
                        value={instrument.id}
                        onChange={onInstrumentChange}
                        checked={userInstruments.includes(instrument.id) ? true : false}/>
                    </div>
                )
            }) : <></>}
        </div>
    )
}

export default InstrumentDropdown;