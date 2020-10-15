import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { aboutOn, recordingsOn } from '../store/ui/profilePage';
import profStyles from '../css-modules/ProfilePage.module.css';


const ProfileTopSection = ({ userProfile, isOwner, name, location, instruments }) => {
    const dispatch = useDispatch();

    const handleAboutClick = () => {
        dispatch(aboutOn());
    }

    const handleRecordingsClick = async () => {
        dispatch(recordingsOn());
    }

    return (
        <div>
            <div className={profStyles.defaultCoverPhoto}>
                <div style={{position: 'relative'}}>
                    <img className={profStyles.defaultProfilePicture} src='https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1218408229?b=1&k=6&m=1218408229&s=612x612&w=0&h=ljIOZzztvumhkaB5d9xLPuZ8cvckG527XCWZIKTCT0k=' alt='Profile' />
                    <div className={profStyles.defaultProfilePictureInnerBorder}></div>
                </div>
            </div>
            <div>
                <h1>{name}</h1>
                <h3>{location}</h3>
                <h4>{"Instruments: " + (instruments.length && instruments[0] ? instruments.map((instrument) => instrument.name).join(", ") : "")}</h4>
            </div>
            <button>Invite</button>
            <button onClick={handleAboutClick}>About</button>
            <button onClick={handleRecordingsClick}>Recordings</button>
        </div>
    )
}

const mapStateToProps = (state, { isOwner, userProfile }) => {
    return {
        name: userProfile ? userProfile.firstName + " " + userProfile.lastName : "",
        location: userProfile ? userProfile.profileInfo.location.split(' ').slice(0, 3).join(" ") : "",
        instruments: userProfile ? userProfile.profileInfo.instruments.map((instrumentId) => state.entities.instruments[instrumentId]) : ""
    }
}

export default connect(mapStateToProps)(ProfileTopSection);