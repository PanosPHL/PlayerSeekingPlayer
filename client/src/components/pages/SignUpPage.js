import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { displayUserInfoForm, displayMap } from '../../store/ui/signUpForm';
import { signup } from '../../store/users';
import { setErrors, clearErrors } from '../../store/errors';
import UserInfoSignUpForm from '../forms/UserInfoSignUpForm';
import GoogleMapsSignUpForm from '../forms/GoogleMapSignUpForm';
import AuthLeft from '../sections/AuthPages/AuthLeft';
import Errors from '../universal/Errors';
import SignUpContext from '../../contexts/SignUpContext';
import styles from '../../css-modules/AuthPages.module.css';

const SignUpPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo, map } = useSelector((state) => state.ui.signUpForm);
  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(displayUserInfoForm());

    return () => {
      dispatch(displayUserInfoForm());
    };
  }, [dispatch]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, []);

  useEffect(() => {
    dispatch(clearErrors());
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    location,
    dispatch,
  ]);

  const value = {
    values: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      location,
      lat,
      lng,
    },
    handlers: {
      setFirstName,
      setLastName,
      setEmail,
      setPassword,
      setConfirmPassword,
      setDateOfBirth,
      setLocation,
      setLat,
      setLng,
    },
  };

  const handleNextClick = () => {
    dispatch(displayMap());
  };

  const handlePreviousClick = () => {
    dispatch(displayUserInfoForm());
    dispatch(clearErrors());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        dateOfBirth,
        location,
        lat,
        lng
      )
    );

    if (res.ok) {
      history.replace(`/profiles/${res.data.id}`);
      return;
    }
    dispatch(setErrors(res.data.errors));
  };

  return (
    <>
      <SignUpContext.Provider value={value}>
        <div
          className={styles.body}
          style={{ display: 'flex', width: '100vw', height: '100vh' }}
        >
          <AuthLeft />
          <div className={styles.authRight}>
            <div className={styles.signUpformContainer}>
              <div className={styles.signUpheaderContainer}>
                <img
                  className={styles.logo}
                  src="/static/images/player-seeking-player-logo-black.png"
                  alt="Player Seeking Player"
                />
                <button
                  className={styles.learnMore + ' ' + styles.bottomButton}
                >
                  <i className="far fa-question-circle"></i>
                  <span style={{ fontSize: '13px' }}>Learn More</span>
                </button>
              </div>
              <h1 className={styles.signUpHeader}>Sign Up</h1>
              {errors.length ? (
                <div className={styles.authErrorWrapper}>
                  <Errors errors={errors} className={styles.authErrors} />
                </div>
              ) : (
                <></>
              )}
              <div className={styles.contentContainer}>
                <div
                  className={
                    load
                      ? styles.initialUserInfoOnscreen
                      : userInfo
                      ? styles.userInfoOnscreen
                      : styles.userInfoOffscreen
                  }
                >
                  <UserInfoSignUpForm />
                </div>
                <div className={map ? styles.mapOnscreen : styles.mapOffscreen}>
                  <GoogleMapsSignUpForm />
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <button
                  className={
                    map ? styles.bottomButton : styles.bottomButton + ' hidden'
                  }
                  onClick={handlePreviousClick}
                >
                  <span>&#8249;</span> Previous
                </button>
                <div className={styles.circleContainer}>
                  <div
                    className={
                      userInfo
                        ? styles.activeDisplayCircle
                        : styles.inactiveDisplayCircle
                    }
                  ></div>
                  <div
                    className={
                      map
                        ? styles.activeDisplayCircle
                        : styles.inactiveDisplayCircle
                    }
                  ></div>
                </div>
                {userInfo ? (
                  <button
                    className={styles.bottomButton}
                    type="button"
                    onClick={handleNextClick}
                  >
                    Next <span>&#8250;</span>
                  </button>
                ) : (
                  <button
                    className={styles.bottomButton}
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
              <p className={styles.loginText}>
                Already have an account?{' '}
                <Link className={styles.linkText} to="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </SignUpContext.Provider>
    </>
  );
};

export default SignUpPage;
