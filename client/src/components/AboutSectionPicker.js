import React from 'react';
import { useDispatch } from 'react-redux';
import { aboutOverviewOn, aboutBiographyOn } from '../store/ui/profilePage';

const AboutSectionPicker = () => {
    const dispatch = useDispatch();
    return (
        <ul>
            <li onClick={() => dispatch(aboutOverviewOn())}>Overview</li>
            <li onClick={() => dispatch(aboutBiographyOn())}>Biography</li>
        </ul>
    )
}

export default AboutSectionPicker;