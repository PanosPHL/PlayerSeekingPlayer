import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { setErrors, clearErrors } from '../../store/errors';
import { toggleLearnMoreModal } from '../../store/ui/authPages';
import { Link, useHistory } from 'react-router-dom';
import AuthLeft from '../sections/AuthPages/AuthLeft';
import Errors from '../universal/Errors';
import authStyles from '../../css-modules/AuthPages.module.css';

const LogInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((state) => state.errors);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(clearErrors());
  }, [email, password, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(email, password));

    if (res.ok) {
      history.replace(`/profiles/${res.data.id}`);
      return;
    }

    dispatch(setErrors(res.data.errors));
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();
    const res = await dispatch(login('demouser@demo.com', 'demo_password'));

    if (res.ok) {
      history.replace(`/profiles/${res.data.id}`);
      return;
    }

    dispatch(setErrors(res.data.errors));
  };

  const handleLearnMoreClick = () => {
    dispatch(toggleLearnMoreModal());
  };

  return (
    <div
      className={authStyles.body}
      style={{ display: 'flex', height: '100vh', width: '100vw' }}
    >
      <AuthLeft />
      <div className={authStyles.authRight}>
        <div className={authStyles.loginFormContainer}>
          <div className={authStyles.logoAndLearnMoreContainer}>
            <img
              className={authStyles.logo}
              src="/images/player-seeking-player-logo-black.png"
              alt="Player Seeking Player"
            />
            <button
              onClick={handleLearnMoreClick}
              className={authStyles.learnMore + ' ' + authStyles.bottomButton}
            >
              <i className="far fa-question-circle"></i>
              <span style={{ fontSize: '13px' }}>Learn More</span>
            </button>
          </div>
          <div className={authStyles.loginHeaderContainer}>
            <h1 className={authStyles.signUpHeader}>Welcome back!</h1>
          </div>
          {errors.length ? (
            <Errors
              errors={errors}
              divStyle={authStyles.loginErrorWrapper}
              className={authStyles.loginErrors}
            />
          ) : (
            <></>
          )}
          <div className={authStyles.loginFormWrapper}>
            <form className={authStyles.loginForm} onSubmit={handleSubmit}>
              <div className="login-form-control-group">
                <p>
                  <label className="labels" htmlFor="email">
                    Email
                  </label>
                </p>
                <input
                  placeholder="i.e. johnsmith@gmail.com"
                  className="form-control"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-form-control-group">
                <p>
                  <label className="labels" htmlFor="password">
                    Password
                  </label>
                </p>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={authStyles.loginSubmitWrapper}>
                <button className={authStyles.bottomButton} type="submit">
                  Sign In
                </button>
                <button
                  onClick={handleDemoUser}
                  className={authStyles.demoButton}
                >
                  Demo User
                </button>
              </div>
            </form>
          </div>
          <p className={authStyles.loginBottomText}>
            Don't have an account?{' '}
            <Link className={authStyles.linkText} to="/signup">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
