import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileTopSection from './ProfileTopSection';
import ProfileContent from './ProfileContent';


const ProfilePage = ({ match }) => {
    const isOwner = useSelector(state => state.session.userId === parseInt(match.params.id));
    const userProfile = useSelector(state => state.entities.users[parseInt(match.params.id)]);
    const instruments = useSelector(state => {
        return userProfile && userProfile.profileInfo && userProfile.profileInfo.instruments ?
        userProfile.profileInfo.instruments.map((instrumentId) => state.entities.instruments[instrumentId]) : null;
    });
    const styles = useSelector(state => {
        return userProfile && userProfile.profileInfo && userProfile.profileInfo.styles ?
        userProfile.profileInfo.styles.map((styleId) => state.entities.styles[styleId]) : null;
    })
    const { about: { display: about }, recordings } = useSelector(state => state.ui.profilePage);

    return (
        <>
            <ProfileTopSection isOwner={isOwner} userProfile={userProfile} about={about} recordings={recordings}/>
            <ProfileContent isOwner={isOwner}
            userProfile={userProfile}
            about={about}
            recordings={recordings}
            instruments={instruments}
            styles={styles}/>
        </>
    )
}

export default withRouter(ProfilePage);