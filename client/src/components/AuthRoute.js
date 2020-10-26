import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const AuthRoute = ({ path, component }) => {
    const { userId } = useSelector(state => state.session);

    if (!userId) {
        return (
            <Redirect to='/login' />
        )
    } else {
        return <Route path={path} component={component}/>
    }
}

export default AuthRoute;