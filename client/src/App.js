import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import GoogleMapsContext from './contexts/GoogleMapsContext';
import AuthRoute from './components/AuthRoute';

import UserList from './components/UsersList';


function App() {
    let apiKey;

    useEffect(() => {
        const getApiKey  = async () => {
            const res = await fetch('/api/session/map-api-token');
            res.data = await res.json();
            console.log(res);
            if (res.ok) {
                apiKey = res.data["api_key"];
                console.log(apiKey);
            }
        }

        getApiKey();
    }, [])

    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>
                <AuthRoute path="/">
                    <h1>My Home Page</h1>
                </AuthRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
