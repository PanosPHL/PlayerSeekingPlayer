import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileTopSection from '../sections/ProfilePage/ProfileTopSection';
import ProfileContent from '../sections/ProfilePage/ProfileContent';
import profStyles from '../../css-modules/ProfilePage.module.css';

const ProfilePage = ({ match }) => {
  const isOwner = useSelector(
    (state) => state.session.userId === parseInt(match.params.id)
  );
  const userProfile = useSelector(
    (state) => state.entities.users[parseInt(match.params.id)]
  );
  const instruments = useSelector((state) => {
    return userProfile &&
      userProfile.profileInfo &&
      userProfile.profileInfo.instruments
      ? userProfile.profileInfo.instruments.map(
          (instrumentId) => state.entities.instruments[instrumentId]
        )
      : null;
  });
  const styles = useSelector((state) => {
    return userProfile &&
      userProfile.profileInfo &&
      userProfile.profileInfo.styles
      ? userProfile.profileInfo.styles.map(
          (styleId) => state.entities.styles[styleId]
        )
      : null;
  });
  const {
    about: { display: about },
    recordings,
  } = useSelector((state) => state.ui.profilePage);

  return (
    <section className={profStyles.pageContainer}>
      <ProfileTopSection
        isOwner={isOwner}
        userProfile={userProfile}
        about={about}
        recordings={recordings}
      />
      <ProfileContent
        isOwner={isOwner}
        userProfile={userProfile}
        about={about}
        recordings={recordings}
        instruments={instruments}
        styles={styles}
      />
    </section>
  );
};

export default withRouter(ProfilePage);
