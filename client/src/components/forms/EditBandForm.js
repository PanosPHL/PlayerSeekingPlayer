import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBandFormId, setBandFormType } from '../../store/session';
import { toggleEditBandModal } from '../../store/ui/myBands';
import { putAndUpdateBandInfo } from '../../store/bands';
import { setErrors, clearErrors } from '../../store/errors';
import BandFormMemberRow from './BandFormMemberRow';
import Errors from '../universal/Errors';
import bandStyles from '../../css-modules/MyBands.module.css';

const EditBandForm = () => {
  const dispatch = useDispatch();
  const band = useSelector(
    (state) => state.entities.bands[state.session.bandFormId]
  );
  const edit = useSelector((state) => state.session.bandFormType === 'edit');
  const styles = useSelector((state) => Object.values(state.entities.styles));
  const members = useSelector((state) =>
    state.entities.bands[state.session.bandFormId].members.map(
      (memberId) => state.entities.users[memberId]
    )
  );
  const pendingMembers = useSelector((state) =>
    state.entities.bands[state.session.bandFormId].pendingMembers.map(
      (memberId) => state.entities.users[memberId]
    )
  );
  const errors = useSelector((state) => state.errors);

  const [name, setName] = useState(band ? band.name : '');
  const [styleId, setStyleId] = useState(band ? `${band.styleId}` : '');

  const handleCloseClick = () => {
    dispatch(toggleEditBandModal());
    dispatch(setBandFormId(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      putAndUpdateBandInfo(band.id, name, styleId, `${band.ownerId}`)
    );
    if (res.ok) {
      dispatch(toggleEditBandModal());
      return;
    }

    dispatch(setErrors(res.data.errors));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [name, styleId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setBandFormId(null));
      dispatch(setBandFormType('edit'));
    };
  }, []);

  return (
    <form
      className={bandStyles.editBandForm}
      onSubmit={handleSubmit}
      method=""
      action=""
    >
      <div className={bandStyles.titleAndButtonContainer}>
        <h2 className={bandStyles.modalFormTitle}>
          {edit ? 'Edit Band' : band.name}
        </h2>
        <button
          className={bandStyles.modalFormClose}
          onClick={handleCloseClick}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      {errors.length ? (
        <Errors
          className={bandStyles.editBandErrorList}
          divStyle={bandStyles.editBandFormErrors}
          errors={errors}
        />
      ) : (
        <></>
      )}
      <div className={bandStyles.bandFormContent}>
        <div className="form-control-group">
          <p>
            <label className="labels" htmlFor="bandName">
              Band Name
              {edit ? <span className="redText">*</span> : <></>}
            </label>
          </p>
          <input
            placeholder="i.e. The Rolling Stones"
            className={'form-control' + (edit ? '' : ' ' + bandStyles.disabled)}
            name="bandName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control-group">
          <p>
            <label className="labels" htmlFor="bandStyle">
              Band Style
              {edit ? <span className="redText">*</span> : <></>}
            </label>
          </p>
          <select
            className={'form-control' + (edit ? '' : ' ' + bandStyles.disabled)}
            name="bandStyle"
            value={styleId}
            onChange={(e) => setStyleId(`${e.target.value}`)}
          >
            <option value="">Select a style</option>
            {styles.length ? (
              styles.map((style, i) => (
                <option key={`style-${i + 1}`} value={style.id}>
                  {style.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className="form-control-group">
          <p className={bandStyles.bandFormMembersHeader}>
            <label className="labels" htmlFor="members">
              Members
            </label>
          </p>
          <div className={bandStyles.bandFormMemberArea}>
            {members.map((member) => (
              <BandFormMemberRow
                edit={edit}
                status="confirmed"
                band={band}
                member={member}
              />
            ))}
            {pendingMembers.map((member) => (
              <BandFormMemberRow
                edit={edit}
                status="pending"
                band={band}
                member={member}
              />
            ))}
          </div>
        </div>
        {edit ? (
          <>
            <div className={bandStyles.editSubmitContainer}>
              <span className={bandStyles.requiredText}>
                <span className="redText">*</span> Required field
              </span>
              <button className={bandStyles.editSubmitButton} type="submit">
                Submit
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default EditBandForm;
