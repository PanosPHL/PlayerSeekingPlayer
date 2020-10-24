import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putAndUpdateBio } from '../store/users';
import { setErrors, clearErrors } from '../store/errors';
import { toggleBioModal } from '../store/ui/profilePage'

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
            <form method="" action="" onSubmit={handleSubmit}>
                <h2>Edit Bio</h2>
                <p>
                <label>Bio</label>
                </p>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
    )
}

export default BioForm;