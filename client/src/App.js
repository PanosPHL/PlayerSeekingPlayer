import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AuthRoute from './components/universal/AuthRoute';
import SignUpPage from './components/pages/SignUpPage';
import LogInPage from './components/pages/LogInPage';
import Home from './components/universal/Home';
import { addUserToSession } from './store/session';
import LearnMoreModal from './components/modals/LearnMoreModal';


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

    }, [dispatch]);

    return (
        <LoadScript googleMapsApiKey={mapsApiKey} libraries={["places"]}>
        <LearnMoreModal />
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
