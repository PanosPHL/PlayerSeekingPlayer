import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleOverviewModal } from '../store/ui/profilePage';
import InstrumentBullet from './InstrumentBullet';
import StylesBullet from './StylesBullet';
import aboutStyles from '../css-modules/About.module.css';


const Overview = ({ age, instrumentNames, styleNames, userProfile }) => {
    const dispatch = useDispatch();
    const locationRegex = /\s\d+/;

    const handleEditClick = () => {
        dispatch(toggleOverviewModal());
        document.body.classList.add('noscroll');
    }

    return (
        <div className={aboutStyles.aboutSectionInnerContainer}>
            <button onClick={handleEditClick} className={aboutStyles.editButton}><i className="fas fa-pencil-alt"></i></button>
            <div className={aboutStyles.overview}>
                <h3 className={aboutStyles.aboutSectionHeader}>Player Overview</h3>
                <ul className={aboutStyles.overviewList}>
                    <li><span className={aboutStyles.bulletSpan}><span>{age ? age.toString() : ""}</span> years old</span></li>
                    <li><span className={aboutStyles.bulletSpan}>Lives in <span>{userProfile && userProfile.profileInfo ? userProfile.profileInfo.location.split(locationRegex)[0] : ""}</span></span></li>
                    <InstrumentBullet instrumentNames={instrumentNames} />
                    <StylesBullet styleNames={styleNames} />
                </ul>
            </div>
        </div>
    )
}

export default Overview;