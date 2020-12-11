import React from 'react';
import { useDispatch } from 'react-redux';
import { aboutOverviewOn, aboutBiographyOn } from '../../../store/ui/profilePage';
import aboutStyles from '../../../css-modules/About.module.css';

const AboutSectionPicker = () => {
    const dispatch = useDispatch();
    return (
        <ul className={aboutStyles.aboutSelector}>
            <li onClick={() => dispatch(aboutOverviewOn())}>Overview</li>
            <li onClick={() => dispatch(aboutBiographyOn())}>Biography</li>
        </ul>
    )
}

export default AboutSectionPicker;