import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AuthRoute from './components/AuthRoute';
import UserList from './components/UsersList';
import SignUpPage from './components/SignUpPage';


function App({ apiKey }) {
    return (
        <LoadScript googleMapsApiKey={apiKey}>
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
                <Route path='/signup'>
                    <SignUpPage/>
                </Route>
                <AuthRoute path="/">
                    <h1>My Home Page</h1>
                </AuthRoute>
            </Switch>
        </BrowserRouter>
        </LoadScript>
    );
}

export default App;
