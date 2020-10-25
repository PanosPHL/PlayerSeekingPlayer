import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleBioModal } from '../store/ui/profilePage';
import BioContext from '../contexts/BioContext';
import BioEditButton from './BioEditButton';
import aboutStyles from '../css-modules/About.module.css';

const Bio = ({ userProfile, isOwner }) => {
    const dispatch = useDispatch();

    const handleEditClick = () => {
        dispatch(toggleBioModal());
        document.body.classList.add('noscroll');
    }

    const value = {
        handleEditClick
    }

    return (
        <BioContext.Provider value={value}>
        <div className={aboutStyles.aboutSectionInnerContainer}>
            <BioEditButton isOwner={isOwner}/>
            <div className={aboutStyles.bio}>
                <h3 className={aboutStyles.aboutSectionHeader}>Biography</h3>
                <p className={aboutStyles.bioContent}>{userProfile ? userProfile.profileInfo.biography : ""}</p>
            </div>
        </div>
        </BioContext.Provider>
    )
}

export default Bio;