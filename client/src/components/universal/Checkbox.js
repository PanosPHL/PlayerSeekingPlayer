import React, { useState, useContext } from 'react';
import OverviewFormContext from '../../contexts/OverviewFormContext';
import SearchContext from '../../contexts/SearchContext';

const Checkbox = ({ i, initCheck, type, name, initValue }) => {
    const overviewRegex = /overview/;

    const [checked, setChecked] = useState(initCheck || false);
    const context = useContext(
        overviewRegex.test(type) ?
        OverviewFormContext : SearchContext
    );

    const handleChange = (e) => {
        if (e.target.checked) {
            setChecked(true);
            if (type === 'overviewInstrument' || type === 'searchInstrument') {
                context.addInstrument(e);
            } else if (type === 'overviewStyle' || type === 'searchStyle') {
                context.addStyle(e);
            }
        } else {
            setChecked(false);
            if (type === 'overviewInstrument' || type === 'searchInstrument') {
                context.removeInstrument(e);
            } else if (type === 'overviewStyle' || type === 'searchStyle') {
                context.removeStyle(e);
            }
        }
    }

    return (
        <input type="checkbox" name={name} value={initValue} onChange={handleChange} checked={checked} />
    )
}

export default Checkbox;