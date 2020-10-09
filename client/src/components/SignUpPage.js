import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { displayUserInfoForm, displayMap } from '../store/ui/signUpForm';
import { signup } from '../store/users';
import { setErrors, clearErrors } from '../store/errors';
import UserInfoSignUpForm from './UserInfoSignUpForm';
import GoogleMapsSignUpForm from './GoogleMapSignUpForm';
import AuthLeft from './AuthLeft';
import SignUpContext from '../contexts/SignUpContext';
import styles from '../css-modules/SignUpPage.module.css';

const SignUpPage = ({ history }) => {
    const dispatch = useDispatch();
    const { userInfo, map } = useSelector(state => state.ui.signUpForm);
    const errors = useSelector(state => state.errors);

    useEffect(() => {
        dispatch(displayUserInfoForm());

        return () => {
            dispatch(displayUserInfoForm());
        }
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

    useEffect(() => {
        dispatch(clearErrors());
    }, [firstName, lastName, email, password, confirmPassword, dateOfBirth, location]);

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
            lng
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
            setLng
        }
    }

    const handleNextClick = () => {
        dispatch(displayMap());
    }

    const handlePreviousClick = () => {
        dispatch(displayUserInfoForm());
        dispatch(clearErrors());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(signup(firstName, lastName, email, password, confirmPassword, dateOfBirth, location, lat, lng));
        console.log(res);
        if (res.ok) {
            history.replace('/');
        }
        dispatch(setErrors(res.data.errors));
    }

    return (
        <>
            <SignUpContext.Provider value={value}>
                <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
                    <AuthLeft />
                    <div className={styles.authRight}>
                        <div className={styles.signUpformContainer}>
                            <div className={styles.signUpheaderContainer}>
                                <h1 className={styles.signUpHeader}>Sign Up</h1>
                            </div>
                            {
                                errors.length ?
                                <ul className={styles.authErrors}>
                                    {errors.map((error, i) => {
                                        return (
                                            <li key={`error-${i + 1}`}>{error}</li>
                                        )
                                    })}
                                </ul> :
                                <></>
                            }
                            <div className={styles.contentContainer}>
                                <div className={userInfo ? styles.userInfoOnscreen : styles.userInfoOffscreen}>
                                    <UserInfoSignUpForm />
                                </div>
                                <div className={map ? styles.mapOnscreen : styles.mapOffscreen}>
                                    <GoogleMapsSignUpForm />
                                </div>
                            </div>
                            <div className={styles.bottomContainer}>
                                <button className={map ? styles.bottomButton : styles.bottomButton + " hidden"} onClick={handlePreviousClick}><span>&#8249;</span> Previous</button>
                                <div className={styles.circleContainer}>
                                    <div className={userInfo ? styles.activeDisplayCircle : styles.inactiveDisplayCircle}></div>
                                    <div className={map ? styles.activeDisplayCircle : styles.inactiveDisplayCircle}></div>
                                </div>
                                {userInfo ? <button className={styles.bottomButton} type="button" onClick={handleNextClick}>Next <span>&#8250;</span></button> : <button className={styles.bottomButton} type="button" onClick={handleSubmit}>Submit</button>}
                            </div>
                            <p className={styles.loginText}>Already have an account? <Link className={styles.linkText} to='/login'>Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </SignUpContext.Provider>
        </>
    )
}

export default withRouter(SignUpPage);