import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleOverviewModal } from '../store/ui/profilePage';
import aboutStyles from '../css-modules/About.module.css';


const Overview = ({ age, instrumentNames, styleNames, userProfile }) => {
    const dispatch = useDispatch();
    const locationRegex = /\s\d+/;

    const handleEditClick = () => {
        dispatch(toggleOverviewModal());
    }

    return (
        <div className={aboutStyles.aboutSectionInnerContainer}>
            <button onClick={handleEditClick} className={aboutStyles.editButton}><i className="fas fa-pencil-alt"></i></button>
            <div className={aboutStyles.overview}>
                <h3 className={aboutStyles.aboutSectionHeader}>Player Overview</h3>
                <ul className={aboutStyles.overviewList}>
                    <li><span><span>{age ? age.toString() : ""}</span> years old</span></li>
                    <li><span>Lives in <span>{userProfile ? userProfile.profileInfo.location.split(locationRegex)[0] : ""}</span></span></li>
                    <li><span>Plays the <span>{(instrumentNames && instrumentNames.length > 1 ?
                        instrumentNames.slice(0, instrumentNames.length - 1).join(', ') + " , and" + instrumentNames[instrumentNames.length - 1]
                        : instrumentNames ? instrumentNames[0] : <></>)}</span></span></li>
                    <li><span>Specializes in <span>{styleNames && styleNames.length > 1 ?
                        styleNames.slice(0, styleNames.length - 1).join(', ') + " , and" + styleNames[styleNames.length - 1]
                        : styleNames ? styleNames[0] : <></>}</span></span></li>
                </ul>
            </div>
        </div>
    )
}

export default Overview;