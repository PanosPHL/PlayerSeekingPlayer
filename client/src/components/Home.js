import React from 'react';
import { BrowserRouter as HomeRouter, Switch, Route, withRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import TopBar from './TopBar';


const Home = () => {
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