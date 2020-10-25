import React, { useContext } from 'react';
import Checkbox from './Checkbox';
import OverviewFormContext from '../contexts/OverviewFormContext';
import aboutStyles from '../css-modules/About.module.css';

const StylesDropdown = ({ styles, userStyles, className }) => {
    const { onStyleChange } = useContext(OverviewFormContext);
    return (
        <ul className={className}>
            {styles && styles.length ? styles.map((style, i) => {
                let includes = userStyles.includes(style.id);
                return (
                    <li className={aboutStyles.dropdownListItem} key={`style-${i + 1}`}>
                        <label className={aboutStyles.dropdownLabel} htmlFor={`style-${i + 1}`}>{style.name}</label>
                        <Checkbox name={`style-${i + 1}`}
                        value={style.id}
                        initCheck={includes}
                        type="style"/>
                    </li>
                )
            }) : <></>}
        </ul>
    )
}

export default StylesDropdown;