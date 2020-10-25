import React from 'react';
import { useSelector } from 'react-redux';
import Checkbox from './Checkbox';

const SearchInstruments = () => {
    const instruments = useSelector(state => Object.values(state.entities.instruments));

    return (
        <ul>
            {
                instruments && instruments.length ?
                instruments.map((instrument, i) => {
                    return (
                        <li key={`instrument-${i + 1}`}>
                            <label>{instrument.name}</label>
                            <Checkbox
                            name={`instrument-${i + 1}`}
                            value={instrument.id}
                            type="searchInstrument"/>
                        </li>
                    )
                }) : <></>
            }
        </ul>
    )
}

export default SearchInstruments;