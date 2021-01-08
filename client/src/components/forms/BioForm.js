import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putAndUpdateBio } from '../../store/users';
import { setErrors, clearErrors } from '../../store/errors';
import { toggleBioModal } from '../../store/ui/profilePage';
import aboutStyles from '../../css-modules/About.module.css';

const BioForm = ({ initBio, userId }) => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState(initBio ? initBio : '');

  useEffect(() => {
    dispatch(clearErrors());
  }, [bio, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(putAndUpdateBio(userId, bio));

    if (res.ok) {
      dispatch(toggleBioModal());
      return;
    }

    dispatch(setErrors(res.data));
  };

  const handleCloseClick = () => {
    dispatch(toggleBioModal());
  };

  return (
    <form
      className={aboutStyles.bioForm}
      method=""
      action=""
      onSubmit={handleSubmit}
    >
      <div className={aboutStyles.bioTitleAndButtonContainer}>
        <h2 className={aboutStyles.bioModalFormTitle}>Edit Bio</h2>
        <button
          className={aboutStyles.bioModalFormClose}
          onClick={handleCloseClick}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <p>
        <label className="labels">Bio</label>
      </p>
      <textarea
        placeholder="Write anything you want other Player Seeking Player users to know about you!"
        className={aboutStyles.bioTextarea + ' form-control'}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button className={aboutStyles.bioSubmitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default BioForm;
