import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AuthRoute from './components/AuthRoute';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import Home from './components/Home';


function App({ apiKey }) {

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <BrowserRouter>
            <Switch>
                <Route path='/login'>
                    <LogInPage/>
                </Route>
                <Route path='/signup'>
                    <SignUpPage />
                </Route>
                <AuthRoute path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
        </LoadScript>
    );
}

export default App;
