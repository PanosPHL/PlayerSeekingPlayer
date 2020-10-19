import React, { useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';

const StylesDropdown = ({ styles, userStyles, className }) => {
    const { onStyleChange } = useContext(OverviewFormContext);
    return (
        <div className={className}>
            {styles && styles.length ? styles.map((style, i) => {
                return (
                    <React.Fragment key={`style-${i + 1}`}>
                        <label htmlFor={`style-${i + 1}`}>{style.name}</label>
                        <input type="checkbox" name={`style-${i + 1}`} value={style.id} onChange={onStyleChange} checked={userStyles.includes(style.id) ? true : false}/>
                    </React.Fragment>
                )
            }) : <></>}
        </div>
    )
}

export default StylesDropdown;