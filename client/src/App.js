import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AuthRoute from './components/AuthRoute';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import Home from './components/Home';
import Cookie from 'js-cookie';


function App({ mapsApiKey }) {
    console.log(Cookie.get());
    return (
        <LoadScript googleMapsApiKey={mapsApiKey} libraries={["places"]}>
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
