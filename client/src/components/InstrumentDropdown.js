import React, { useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';

const InstrumentDropdown = ({ instruments }) => {
    const { onInstrumentChange } = useContext(OverviewFormContext);
    return (
        <div>
            {instruments && instruments.length ? instruments.map((instrument, i) => {
                return (
                    <React.Fragment key={`instrument-${i + 1}`}>
                        <label htmlFor={`instrument-${i + 1}`}>{instrument.name}</label>
                        <input type="checkbox" name={`instrument-${i + 1}`} value={instrument.id} onChange={onInstrumentChange} />
                    </React.Fragment>
                )
            }) : <></>}
        </div>
    )
}

export default InstrumentDropdown;