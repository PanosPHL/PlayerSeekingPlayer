import React, { useContext } from 'react';
import OverviewFormContext from '../contexts/OverviewFormContext';
import aboutStyles from '../css-modules/About.module.css';

const StylesDropdown = ({ styles, userStyles, className }) => {
    const { onStyleChange } = useContext(OverviewFormContext);
    return (
        <ul className={className}>
            {styles && styles.length ? styles.map((style, i) => {
                return (
                    <li className={aboutStyles.dropdownListItem} key={`style-${i + 1}`}>
                        <label className={aboutStyles.dropdownLabel} htmlFor={`style-${i + 1}`}>{style.name}</label>
                        <input type="checkbox" name={`style-${i + 1}`} value={style.id} onChange={onStyleChange} checked={userStyles.includes(style.id) ? true : false}/>
                    </li>
                )
            }) : <></>}
        </ul>
    )
}

export default StylesDropdown;