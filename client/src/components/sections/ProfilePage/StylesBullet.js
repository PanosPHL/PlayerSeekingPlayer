import React from 'react';
import aboutStyles from '../../../css-modules/About.module.css';

const StylesBullet = ({ styleNames }) => {
    return (
        <li><span className={aboutStyles.bulletSpan}>{styleNames && styleNames.length > 2 ?
            "Specializes in " + styleNames.slice(0, styleNames.length - 1).join(', ') + ", and " + styleNames[styleNames.length - 1]
            : styleNames && styleNames.length === 2 ? "Specializes in " + styleNames.join(" and ") :
            styleNames ? "Specializes in " + styleNames[0] : "This user has not yet set their styles"}</span></li>
    )
}

export default StylesBullet;