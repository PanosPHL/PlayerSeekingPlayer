import React, { useState } from 'react';
import UserInfoSignUpForm from './UserInfoSignUpForm';
import SignUpContext from '../contexts/SignUpContext';

const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    const value = {
        values: {
            firstName,
            lastName,
            email,
            dateOfBirth
        },
        handlers: {
            setFirstName,
            setLastName,
            setEmail,
            setDateOfBirth
        }
    }

    return (
        <SignUpContext.Provider value={value}>
        <div>
            <UserInfoSignUpForm />
        </div>
        </SignUpContext.Provider>
    )
}

export default SignUpPage;