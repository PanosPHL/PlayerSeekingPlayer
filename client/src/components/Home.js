import React, { useEffect } from 'react';
import { BrowserRouter as HomeRouter, Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSessionData } from '../store/session'
import ProfilePage from './ProfilePage';
import TopBar from './TopBar';
import RecordingFormModal from './RecordingFormModal';
import Footer from './Footer';
import OverviewFormModal from './OverviewFormModal';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            await dispatch(getSessionData());
        }
        getData();
    }, [dispatch])

    return (
        <>
        <TopBar />
        <HomeRouter>
        <OverviewFormModal />
        <RecordingFormModal />
            <Switch>
                <Route path='/profiles/:id'>
                    <ProfilePage />
                </Route>
            </Switch>
        </HomeRouter>
        <Footer />
        </>
    )
}

export default withRouter(Home);