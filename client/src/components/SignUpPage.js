import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayUserInfoForm, displayMap } from '../store/ui/signUpForm';
import { LoadScript } from '@react-google-maps/api';
import UserInfoSignUpForm from './UserInfoSignUpForm';
import GoogleMapsSignUpForm from './GoogleMapSignUpForm';
import SignUpContext from '../contexts/SignUpContext';
import styles from '../css-modules/SignUpPage.module.css';

const SignUpPage = ({ apiKey }) => {
    const dispatch = useDispatch();
    const { userInfo, map } = useSelector(state => state.ui.signUpForm)

    useEffect(() => {
        dispatch(displayUserInfoForm());
    }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [location, setLocation] = useState('');

    const value = {
        values: {
            firstName,
            lastName,
            email,
            dateOfBirth,
            location
        },
        handlers: {
            setFirstName,
            setLastName,
            setEmail,
            setDateOfBirth,
            setLocation
        }
    }

    const handleNextClick = () => {
        dispatch(displayMap());
    }

    const handlePreviousClick = () => {
        dispatch(displayUserInfoForm());
    }

    return (
        <>
        <SignUpContext.Provider value={value}>
            <div style={{ width: "100vw", height: "100vh" }}>
                <div className={styles.formContainer}>
                    <h1>Sign Up For Player Seeking Player</h1>
                    <div className={styles.contentContainer}>
                    <div className={ userInfo ? styles.userInfoOnscreen : styles.userInfoOffscreen }>
                        <UserInfoSignUpForm />
                    </div>
                    <div className={map ? styles.mapOnscreen : styles.mapOffscreen}>
                        <GoogleMapsSignUpForm/>
                    </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <button className={ map ? "" : "hidden" }onClick={handlePreviousClick}><span>&#8249;</span> Previous</button>
                        <div className={styles.circleContainer}>
                            <div className={styles.activeDisplayCircle}></div>
                            <div className={styles.inactiveDisplayCircle}></div>
                        </div>
                        { userInfo ? <button type="button" onClick={handleNextClick}>Next <span>&#8250;</span></button> : <button type="button">Submit</button>}
                    </div>
                </div>
            </div>
        </SignUpContext.Provider>
        </>
    )
}

export default SignUpPage;