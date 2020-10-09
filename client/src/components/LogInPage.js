import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/session';
import { Link, withRouter } from 'react-router-dom';
import AuthLeft from './AuthLeft';
import authStyles from '../css-modules/SignUpPage.module.css';

const LogInPage = ({ history }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(login(email, password));

        if (res.ok) {
            history.replace('/');
        }
    }

    return (
        <div style={{display: "flex", height: "100vh", width: "100vw"}}>
            <AuthLeft />
            <div className={authStyles.authRight}>
                <div className={authStyles.loginFormContainer}>
                    <div className={authStyles.loginHeaderContainer}>
                        <h1 className={authStyles.signUpHeader}>Welcome back!</h1>
                    </div>
                    <form method="" action="" onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="email">Email</label>
                        </p>
                        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <p>
                            <label htmlFor="password">Password</label>
                        </p>
                        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div>
                        <button type="submit">Sign In</button>
                        </div>
                    </form>
                <p>Don't have an account? <Link className={authStyles.linkText} to='/signup'>Sign up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LogInPage);