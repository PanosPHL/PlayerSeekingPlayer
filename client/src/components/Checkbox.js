import React, { useState, useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';
import SearchContext from '../contexts/SearchContext';

const Checkbox = ({ i, initCheck, type, name, value }) => {
    const overviewRegex = /overview/;

    const [checked, setChecked] = useState(initCheck);
    const context = useContext(
        overviewRegex.test(type) ?
        OverviewFormContext :
        SearchContext
    );

    const handleChange = (e) => {
        if (e.target.checked) {
            setChecked(true);
            if (type === 'overviewInstrument') {
                context.overviewLocalDispatch({ type: context.actionTypes.ADD_INSTRUMENT, instrumentId: parseInt(e.target.value) });
            } else {
                context.overviewLocalDispatch({ type: context.actionTypes.ADD_STYLE, styleId: parseInt(e.target.value) });
            }
        } else {
            setChecked(false);
            if (type === 'overviewInstrument') {
                context.overviewLocalDispatch({ type: context.actionTypes.REMOVE_INSTRUMENT, instrumentId: parseInt(e.target.value) });
            } else {
                context.overviewLocalDispatch({ type: context.actionTypes.REMOVE_STYLE, styleId: parseInt(e.target.value) });
            }
        }
    }

    return (
        <input type="checkbox" name={name} value={value} onChange={handleChange} checked={checked} />
    )
}

export default Checkbox;