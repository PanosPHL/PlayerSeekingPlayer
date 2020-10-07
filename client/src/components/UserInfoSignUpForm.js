import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import SignUpContext from '../contexts/SignUpContext';
import "react-datepicker/dist/react-datepicker.css";

const UserInfoSignUpForm = () => {
    const {
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
    } = useContext(SignUpContext);

    return (
        <form method="" action="">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" placeholder='i.e. John' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <label htmlFor='lastName'>Last Name</label>
            <input type="text" name="lastName" placeholder="i.e. Smith" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <label htmlfor="email">Email</label>
            <input type="email" name="email" placeholder='i.e. johnsmith@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <DatePicker selected={dateOfBirth} onChange={date => setDateOfBirth(date)}/>
        </form>
    )
}

export default UserInfoSignUpForm;