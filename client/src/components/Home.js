import React, { useEffect } from 'react';
import { BrowserRouter as HomeRouter, Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSessionData } from '../store/session'
import ProfilePage from './ProfilePage';
import TopBar from './TopBar';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            const res = await dispatch(getSessionData());
        }
        getData();
    }, [dispatch])

    return (
        <>
        <TopBar />
        <HomeRouter>
            <Switch>
                <Route path='/profiles/:id'>
                    <ProfilePage />
                </Route>
            </Switch>
        </HomeRouter>
        </>
    )
}

export default withRouter(Home);