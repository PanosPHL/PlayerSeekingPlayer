import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/session';
import { setErrors, clearErrors } from '../store/errors';
import { Link, withRouter } from 'react-router-dom';
import AuthLeft from './AuthLeft';
import authStyles from '../css-modules/AuthPages.module.css';

const LogInPage = ({ history }) => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(clearErrors());
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(login(email, password));

        if (res.ok) {
            history.replace('/');
        }

        dispatch(setErrors(res.data.errors));
    }

    return (
        <div style={{display: "flex", height: "100vh", width: "100vw"}}>
            <AuthLeft />
            <div className={authStyles.authRight}>
                <div className={authStyles.loginFormContainer}>
                    <div className={authStyles.loginHeaderContainer}>
                        <h1 className={authStyles.signUpHeader}>Welcome back!</h1>
                    </div>
                    {
                        errors.length ?
                        <div className={authStyles.loginErrorWrapper}>
                        <ul className={authStyles.loginErrors}>
                            { errors.map((error, i) => {
                                return (
                                <li key={`error-${i + 1}`}>{error}</li>
                                )
                            })}
                        </ul>
                        </div> :
                        <></>
                    }
                    <div className={authStyles.loginFormWrapper}>
                    <form className={authStyles.loginForm} method="" action="" onSubmit={handleSubmit}>
                        <div className="login-form-control-group">
                        <p>
                            <label className={authStyles.labels} htmlFor="email">Email</label>
                        </p>
                        <input className="form-control" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="login-form-control-group">
                        <p>
                            <label className={authStyles.labels} htmlFor="password">Password</label>
                        </p>
                        <input className="form-control" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className={authStyles.loginSubmitWrapper}>
                        <button className={authStyles.bottomButton} type="submit">Sign In</button>
                        </div>
                    </form>
                    </div>
                <p className={authStyles.loginBottomText}>Don't have an account? <Link className={authStyles.linkText} to='/signup'>Sign up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LogInPage);