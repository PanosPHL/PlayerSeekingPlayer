import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AuthRoute from './components/AuthRoute';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import Home from './components/Home';
import { addUserToSession } from './store/session';


function App({ mapsApiKey }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch('/api/session/');

            res.data = await res.json();

            if (res.ok) {
                dispatch(addUserToSession(res.data.userId));
            }
        }

        loadUser();

    }, []);

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
