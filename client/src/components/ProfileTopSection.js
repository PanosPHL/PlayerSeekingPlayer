import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aboutOn, recordingsOn, toggleProfilePicButton } from '../store/ui/profilePage';
import profStyles from '../css-modules/ProfilePage.module.css';


const ProfileTopSection = ({ userProfile, about, recordings }) => {
    const dispatch = useDispatch();
    const { pictures: { profilePicButton } } = useSelector(state => state.ui.profilePage);

    const handlePicToggle = () => {
        dispatch(toggleProfilePicButton());
    }

    const handleAboutClick = () => {
        dispatch(aboutOn());
    }

    const handleRecordingsClick = async () => {
        dispatch(recordingsOn());
    }

    return (
        <div className={profStyles.sectionContainer}>
            <div className={profStyles.defaultCoverPhoto}>
                <div
                className={profStyles.pictureContainer}
                onMouseEnter={handlePicToggle}
                onMouseLeave={handlePicToggle}>
                    <img className={profStyles.defaultProfilePicture} src='https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1218408229?b=1&k=6&m=1218408229&s=612x612&w=0&h=ljIOZzztvumhkaB5d9xLPuZ8cvckG527XCWZIKTCT0k=' alt='Profile' />
                    <div className={profStyles.defaultProfilePictureInnerBorder}></div>
                    { profilePicButton ?
                    <button className={profStyles.profilePicButton}><i className="fas fa-camera"></i></button> :
                    <></> }
                </div>
            </div>
            <div className={profStyles.name}>
                <h1>{userProfile ? userProfile.firstName + ' ' + userProfile.lastName : ''}</h1>
            </div>
            <div className={profStyles.toolbar}>
                <div className={profStyles.buttonContainer}>
                    <button className={profStyles.button + (about ? " " + profStyles.activeButton : "")} onClick={handleAboutClick}>About</button>
                    <button className={profStyles.button + " " + profStyles.lastButton + (recordings ? " " + profStyles.activeButton : "")} onClick={handleRecordingsClick}>Recordings</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileTopSection;