import React from 'react';
import aboutStyles from '../css-modules/About.module.css';

const StylesBullet = ({ styleNames }) => {
    return (
        <li><span className={aboutStyles.bulletSpan}>Specializes in {styleNames && styleNames.length > 2 ?
            styleNames.slice(0, styleNames.length - 1).join(', ') + ", and " + styleNames[styleNames.length - 1]
            : styleNames && styleNames.length == 2 ? styleNames.join(" and ") :
            styleNames ? styleNames[0] : <></>}</span></li>
    )
}

export default StylesBullet;