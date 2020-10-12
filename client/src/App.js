import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AuthRoute from './components/AuthRoute';
import UserList from './components/UsersList';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';


function App({ apiKey }) {

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <BrowserRouter>
            <Switch>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path='/login'>
                    <LogInPage/>
                </Route>
                <Route path='/signup'>
                    <SignUpPage />
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
