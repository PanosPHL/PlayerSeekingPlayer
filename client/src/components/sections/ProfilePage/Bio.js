import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleBioModal } from '../../../store/ui/profilePage';
import BioContext from '../../../contexts/BioContext';
import BioEditButton from '../../buttons/BioEditButton';
import aboutStyles from '../../../css-modules/About.module.css';

const Bio = ({ userProfile, isOwner }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(toggleBioModal());
  };

  const value = {
    handleEditClick,
  };

  return (
    <BioContext.Provider value={value}>
      <BioEditButton isOwner={isOwner} />
      <h3 className={aboutStyles.aboutSectionHeader}>Biography</h3>
      <div className={aboutStyles.bioContent}>
        {userProfile
          ? userProfile.profileInfo.biography
              .split('\n')
              .map((line) => <p>{line}</p>)
          : ''}
      </div>
    </BioContext.Provider>
  );
};

export default Bio;
