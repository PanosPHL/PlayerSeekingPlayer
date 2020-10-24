import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putAndUpdateBio } from '../store/users';
import { setErrors, clearErrors } from '../store/errors';
import { toggleBioModal } from '../store/ui/profilePage'
import aboutStyles from '../css-modules/About.module.css';

const BioForm = ({ initBio, userId }) => {
    const dispatch = useDispatch();
    const [bio, setBio] = useState(initBio ? initBio : '');

    useEffect(() => {
        dispatch(clearErrors())
    }, [bio, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(putAndUpdateBio(userId, bio));

        if (res.ok) {
            dispatch(toggleBioModal());
            document.body.classList.remove('noscroll');
            return;
        }

        dispatch(setErrors(res.data));
    }

    return (
            <form className={aboutStyles.bioForm} method="" action="" onSubmit={handleSubmit}>
                <h2 className={aboutStyles.modalFormTitle}>Edit Bio</h2>
                <p>
                <label className="labels">Bio</label>
                </p>
                <textarea className={aboutStyles.bioTextarea + " form-control"} rows="12" value={bio} onChange={(e) => setBio(e.target.value)} />
                <button className={aboutStyles.bioSubmitButton} type="submit">Submit</button>
            </form>
    )
}

export default BioForm;