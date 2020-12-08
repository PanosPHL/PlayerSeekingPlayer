import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleOverviewModal } from '../store/ui/profilePage';
import InstrumentBullet from './InstrumentBullet';
import StylesBullet from './StylesBullet';
import OverviewEditButton from './OverviewEditButton';
import OverviewContext from '../contexts/OverviewContext';
import aboutStyles from '../css-modules/About.module.css';


const Overview = ({ age, instrumentNames, styleNames, userProfile, isOwner }) => {
    const dispatch = useDispatch();
    const locationRegex = /\s\d+/;

    const handleEditClick = () => {
        dispatch(toggleOverviewModal());
    }

    const value = {
        handleEditClick
    }

    return (
        <OverviewContext.Provider value={value}>
        <div className={aboutStyles.aboutSectionInnerContainer}>
            <OverviewEditButton isOwner={isOwner}/>
            <div className={aboutStyles.overview}>
                <h3 className={aboutStyles.aboutSectionHeader}>Player Overview</h3>
                <ul className={aboutStyles.overviewList}>
                    <li>{age ? age.toString() : ""} years old</li>
                    <li>{userProfile && userProfile.profileInfo && userProfile.profileInfo.location ?
                    "Lives in " + userProfile.profileInfo.location.split(locationRegex)[0] :
                    "This user has not yet set a location"}</li>
                    <InstrumentBullet instrumentNames={instrumentNames} />
                    <StylesBullet styleNames={styleNames} />
                </ul>
            </div>
        </div>
        </OverviewContext.Provider>
    )
}

export default Overview;