import React, { useState, useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';

const Checkbox = ({ i, initCheck, type, name, value }) => {
    const [checked, setChecked] = useState(initCheck);
    const {
        actionTypes: {
            ADD_INSTRUMENT,
            REMOVE_INSTRUMENT,
            ADD_STYLE,
            REMOVE_STYLE
        },
        localDispatch
    } = useContext(OverviewFormContext);

    const handleChange = (e) => {
        if (e.target.checked) {
            setChecked(true);
            if (type === 'instrument') {
                localDispatch({ type: ADD_INSTRUMENT, instrumentId: parseInt(e.target.value) });
            } else {
                localDispatch({ type: ADD_STYLE, styleId: parseInt(e.target.value) });
            }
        } else {
            setChecked(false);
            if (type === 'instrument') {
                localDispatch({ type: REMOVE_INSTRUMENT, instrumentId: parseInt(e.target.value) });
            } else {
                localDispatch({ type: REMOVE_STYLE, styleId: parseInt(e.target.value) });
            }
        }
    }

    return (
        <input type="checkbox" name={name} value={value} onChange={handleChange} checked={checked} />
    )
}

export default Checkbox;