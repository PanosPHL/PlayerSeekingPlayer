import React, { useEffect } from 'react';
import { BrowserRouter as HomeRouter, Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSessionData } from '../store/session'
import ProfilePage from './ProfilePage';
import TopBar from './TopBar';
import RecordingFormModal from './RecordingFormModal';
import Footer from './Footer';
import OverviewFormModal from './OverviewFormModal';
import BioFormModal from './BioFormModal';
import SearchResults from './SearchResults';
import ProfilePicFormModal from './ProfilePicFormModal';
import MyBands from './MyBands';
import NewBandModal from './NewBandModal';
import ManageInvitationsModal from './ManageInvitationsModal';
import MyInvitations from './MyInvitations';


const Home = ({ match }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            await dispatch(getSessionData());
        }
        getData();
    }, [dispatch])

    return (
        <>
            <HomeRouter>
            <BioFormModal />
            <OverviewFormModal />
            <ProfilePicFormModal />
            <RecordingFormModal />
            <NewBandModal />
            <ManageInvitationsModal />
                <TopBar />
                <Switch>
                    <Route path={`${match.url}profiles/:id`} component={ProfilePage} />
                    <Route path={`${match.url}search`} component={SearchResults} />
                    <Route path={`${match.url}my-bands`} component={MyBands} />
                    <Route path={`${match.url}my-invitations`} component={MyInvitations} />
                </Switch>
            </HomeRouter>
            <Footer />
        </>
    )
}

export default withRouter(Home);