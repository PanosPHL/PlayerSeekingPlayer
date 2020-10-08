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
            password,
            confirmPassword,
            dateOfBirth
        },
        handlers: {
            setFirstName,
            setLastName,
            setEmail,
            setPassword,
            setConfirmPassword,
            setDateOfBirth
        }
    } = useContext(SignUpContext);

    return (
        <form method="" action="">
            <p>
            <label htmlFor="firstName">First Name</label>
            </p>
            <input type="text" name="firstName" placeholder='i.e. John' value={firstName} required="required" onChange={(e) => setFirstName(e.target.value)}/>
            <p>
            <label htmlFor='lastName'>Last Name</label>
            </p>
            <input type="text" name="lastName" placeholder="i.e. Smith" value={lastName} required="required" onChange={(e) => setLastName(e.target.value)}/>
            <p>
            <label htmlFor="email">Email</label>
            </p>
            <input type="email" name="email" placeholder='i.e. johnsmith@gmail.com' value={email} required="required" onChange={(e) => setEmail(e.target.value)}/>
            <p>
                <label htmlFor="password">Password</label>
            </p>
            <input type="password" name="password" value={password} required="required" onChange={(e) => setPassword(e.target.value)} />
            <p>
                <label htmlFor="confirmPassword">Confirm Password</label>
            </p>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <p>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            </p>
            <DatePicker selected={dateOfBirth}  required="required" onChange={date => setDateOfBirth(date)}/>
        </form>
    )
}

export default UserInfoSignUpForm;