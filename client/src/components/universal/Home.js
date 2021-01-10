import React, { useEffect } from 'react';
import {
  BrowserRouter as HomeRouter,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSessionData } from '../../store/session';
import ProfilePage from '../pages/ProfilePage';
import TopBar from './TopBar';
import RecordingFormModal from '../modals/RecordingFormModal';
import Footer from './Footer';
import OverviewFormModal from '../modals/OverviewFormModal';
import BioFormModal from '../modals/BioFormModal';
import SearchResults from '../pages/SearchResults';
import ProfilePicFormModal from '../modals/ProfilePicFormModal';
import MyBands from '../pages/MyBands';
import NewBandModal from '../modals/NewBandModal';
import ManageInvitationsModal from '../modals/ManageInvitationsModal';
import MyInvitations from '../pages/MyInvitations';
import EditBandFormModal from '../modals/EditBandFormModal';

const Home = ({ location }) => {
  const dispatch = useDispatch();

  const profRegex = /\/profiles\/\d+/;
  const bandRegex = /\/my-bands/;
  const invitationRegex = /\/my-invitations/;
  const searchRegex = /\/search/;

  let footerClassName = 'footer';

  if (profRegex.test(location.pathname)) {
    footerClassName = 'profileFooter';
  } else if (bandRegex.test(location.pathname)) {
    footerClassName = 'bandFooter';
  } else if (invitationRegex.test(location.pathname)) {
    footerClassName = 'invitationFooter';
  } else if (searchRegex.test(location.pathname)) {
    footerClassName = 'searchFooter';
  }

  useEffect(() => {
    const getData = async () => {
      await dispatch(getSessionData());
    };
    getData();
  }, [dispatch]);

  return (
    <>
      <HomeRouter>
        <BioFormModal />
        <OverviewFormModal />
        <ProfilePicFormModal />
        <RecordingFormModal />
        <NewBandModal />
        <ManageInvitationsModal />
        <EditBandFormModal />
        <TopBar />
        <Switch>
          <Route path={`/profiles/:id`} component={ProfilePage} />
          <Route path={`/search`} component={SearchResults} />
          <Route path={`/my-bands`} component={MyBands} />
          <Route path={`/my-invitations`} component={MyInvitations} />
        </Switch>
      </HomeRouter>
      <Footer pageClassName={footerClassName} />
    </>
  );
};

export default withRouter(Home);
