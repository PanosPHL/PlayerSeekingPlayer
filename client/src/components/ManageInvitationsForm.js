import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { putAndAddMember } from '../store/bands';
import { toggleManageInvitationModal } from '../store/ui/invitations';
import invStyles from '../css-modules/MyInvitations.module.css';


const ManageInvitationsForm = ({ ownedBands, location }) => {
  const recipientId = location.pathname.split('/')[2].toString();
  const senderId = useSelector(state => state.session.userId.toString());
  const dispatch = useDispatch();
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
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await dispatch(putAndAddMember(senderId, recipientId, bandId, message));
  }

  return (
    <form className={invStyles.manageInvitationForm} onSubmit={handleSubmit} method="" action="">
      <h2>Send an Invitation</h2>
      <button onClick={handleCloseClick}><i className="fas fa-times"></i></button>
      <div>
        <div className="form-control-group">
          <p>
            <label className="labels" htmlFor="bandName">Band</label>
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
            <label htmlFor="message" className="labels">Message</label>
          </p>
      <textarea className="form-control" onChange={handleMessageChange} value={message}/>
        </div>
      <button type='submit'>Send Invitation</button>
      </div>
    </form>
  );
};

export default withRouter(ManageInvitationsForm);
