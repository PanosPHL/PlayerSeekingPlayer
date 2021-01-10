import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  aboutOn,
  recordingsOn,
  toggleProfilePicButton,
  toggleProfilePicForm,
} from '../../../store/ui/profilePage';
import profStyles from '../../../css-modules/ProfilePage.module.css';
import ManageInvitationsButton from '../../buttons/ManageInvitationsButton';

const ProfileTopSection = ({ isOwner, userProfile, about, recordings }) => {
  const dispatch = useDispatch();
  const {
    pictures: { profilePicButton },
  } = useSelector((state) => state.ui.profilePage);

  const handlePicToggle = (type) => {
    if (type === 'enter' && !profilePicButton) {
      dispatch(toggleProfilePicButton());
      return;
    }

    if (type === 'exit' && profilePicButton) {
      dispatch(toggleProfilePicButton());
    }
  };

  const handleCameraClick = () => {
    if (profilePicButton) {
      dispatch(toggleProfilePicButton());
    }
    dispatch(toggleProfilePicForm());
  };

  const handleAboutClick = () => {
    dispatch(aboutOn());
  };

  const handleRecordingsClick = async () => {
    dispatch(recordingsOn());
  };

  return (
    <div className={profStyles.sectionContainer}>
      <div className={profStyles.defaultCoverPhoto}>
        <div className={profStyles.pictureAndNameContainer}>
          <div
            className={profStyles.pictureContainer}
            onMouseEnter={() => {
              handlePicToggle('enter');
            }}
            onMouseLeave={() => {
              handlePicToggle('exit');
            }}
          >
            <img
              className={profStyles.defaultProfilePicture}
              src={
                userProfile
                  ? userProfile.profileInfo.profilePic ||
                    '/images/default_profile_photo.jpg'
                  : ''
              }
              alt="Profile"
            />
            <div className={profStyles.defaultProfilePictureInnerBorder}></div>
            {profilePicButton && isOwner ? (
              <button
                onClick={handleCameraClick}
                className={profStyles.profilePicButton}
              >
                <i className="fas fa-camera"></i>
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className={isOwner ? profStyles.name : profStyles.nameAndButton}>
            <h1 style={{ marginBottom: '14px' }}>
              {userProfile
                ? userProfile.firstName + ' ' + userProfile.lastName
                : ''}
            </h1>
            {isOwner ? <></> : <ManageInvitationsButton />}
          </div>
        </div>
      </div>
      <div className={profStyles.toolbar}>
        <div className={profStyles.buttonContainer}>
          <button
            className={
              profStyles.button + (about ? ' ' + profStyles.activeButton : '')
            }
            onClick={handleAboutClick}
          >
            About
          </button>
          <button
            className={
              profStyles.button +
              ' ' +
              profStyles.lastButton +
              (recordings ? ' ' + profStyles.activeButton : '')
            }
            onClick={handleRecordingsClick}
          >
            Recordings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTopSection;
