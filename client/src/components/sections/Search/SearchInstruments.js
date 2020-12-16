import React from 'react';
import { useSelector } from 'react-redux';
import Checkbox from '../../universal/Checkbox';

const SearchInstruments = ({ className, labelStyle, checkboxStyle }) => {
    const instruments = useSelector(state => Object.values(state.entities.instruments));

    return (
        <ul className={className}>
            {
                instruments && instruments.length ?
                instruments.map((instrument, i) => {
                    return (
                        <li key={`instrument-${i + 1}`}>
                            <label className={labelStyle}>{instrument.name}</label>
                            <Checkbox
                            name={`instrument-${i + 1}`}
                            initValue={instrument.id}
                            type="searchInstrument"/>
                        </li>
                    )
                }) : <></>
            }
        </ul>
    )
}

export default SearchInstruments;