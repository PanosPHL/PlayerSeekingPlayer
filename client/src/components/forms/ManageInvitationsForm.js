import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { putAndAddMember } from "../../store/bands";
import { setErrors, clearErrors } from "../../store/errors";
import { toggleManageInvitationModal } from "../../store/ui/invitations";
import Errors from "../universal/Errors";
import invStyles from "../../css-modules/MyInvitations.module.css";

const ManageInvitationsForm = ({ ownedBands, location }) => {
  const recipientId = location.pathname.split("/")[2].toString();
  const dispatch = useDispatch();
  const senderId = useSelector((state) => state.session.userId.toString());
  const recipient = useSelector((state) => state.entities.users[recipientId]);
  const errors = useSelector((state) => state.errors);
  const [bandId, setBandId] = useState("0");
  const [message, setMessage] = useState("");

  const handleBandIdChange = (e) => {
    setBandId(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseClick = () => {
    dispatch(toggleManageInvitationModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(putAndAddMember(senderId, recipientId, bandId, message));

    if (res.ok) {
      dispatch(toggleManageInvitationModal());
      return;
    }

    dispatch(setErrors(res.data.errors));
  };

  useEffect(() => {
      dispatch(clearErrors());
  }, [bandId, dispatch]);

  return (
    <form
      className={invStyles.manageInvitationForm}
      onSubmit={handleSubmit}
      method=""
      action=""
    >
      <h2 className={invStyles.modalFormTitle}>
        Send {recipient.firstName} an Invitation
      </h2>
      <button className={invStyles.modalFormClose} onClick={handleCloseClick}>
        <i className="fas fa-times"></i>
      </button>
      {errors.length ? (
        <Errors
          errors={errors}
          className={invStyles.errors}
          listClass={invStyles.errorList}
        />
      ) : (
        <></>
      )}
      <div className={invStyles.formContent}>
        <div className="form-control-group">
          <p>
            <label className="labels" htmlFor="bandName">
              Band
            </label>
          </p>
          <select className="form-control" onChange={handleBandIdChange}>
            <option value="-1">Select a Band</option>
            {ownedBands.length ? (
              ownedBands.map((band, i) => (
                <option key={`band-${i + 1}`} value={band.id}>
                  {band.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className="form-control-group">
          <p>
            <label htmlFor="message" className="labels">
              Message
            </label>
          </p>
          <textarea
            rows="14"
            className={"form-control " + invStyles.formMessage}
            onChange={handleMessageChange}
            value={message}
          />
        </div>
        <div className={invStyles.submitContainer}>
          <button className={invStyles.submitButton} type="submit">
            Send Invitation
          </button>
        </div>
      </div>
      <span className={invStyles.requiredText}><span className="redText">*</span> Required field</span>
    </form>
  );
};

export default withRouter(ManageInvitationsForm);
