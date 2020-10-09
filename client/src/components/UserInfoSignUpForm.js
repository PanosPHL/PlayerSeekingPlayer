import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import SignUpContext from '../contexts/SignUpContext';
import styles from '../css-modules/SignUpPage.module.css';
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
        <form className={styles.userInfoForm} method="" action="">
            <div className="form-control-group">
            <p>
            <label className={styles.labels} htmlFor="firstName">First Name</label>
            </p>
            <input type="text" name="firstName" className="form-control" placeholder='i.e. John' value={firstName} required="required" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="form-control-group">
            <p>
            <label className={styles.labels} htmlFor='lastName'>Last Name</label>
            </p>
            <input type="text" name="lastName" className="form-control" placeholder="i.e. Smith" value={lastName} required="required" onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="form-control-group">
            <p>
            <label className={styles.labels} htmlFor="email">Email</label>
            </p>
            <input type="email" name="email" className="form-control" placeholder='i.e. johnsmith@gmail.com' value={email} required="required" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-control-group">
            <p>
                <label className={styles.labels} htmlFor="password">Password</label>
            </p>
            <input type="password" name="password" className="form-control" value={password} required="required" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-control-group">
            <p>
                <label className={styles.labels} htmlFor="confirmPassword">Confirm Password</label>
            </p>
            <input type="password" name="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="form-control-group">
            <p>
            <label className={styles.labels} htmlFor="dateOfBirth">Date of Birth</label>
            </p>
            <DatePicker selected={dateOfBirth}  required="required" onChange={date => setDateOfBirth(date)} className="form-control"/>
            </div>
        </form>
    )
}

export default UserInfoSignUpForm;