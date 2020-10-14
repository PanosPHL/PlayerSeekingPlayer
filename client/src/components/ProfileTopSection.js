import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { aboutOn, recordingsOn } from '../store/ui/profilePage';


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
            <h1>{name}</h1>
            <h3>{location}</h3>
            <h4>{"Instruments: " + (instruments.length && instruments[0] ? instruments.map((instrument) => instrument.name).join(", ") : "")}</h4>
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