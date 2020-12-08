import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { putAndAddMember } from '../store/bands';
import { toggleManageInvitationModal } from '../store/ui/invitations';

const ManageInvitationsForm = ({ ownedBands, location }) => {
  const recipientId = location.pathname.split('/')[2].toString();
  const senderId = useSelector(state => state.session.userId.toString());
  const dispatch = useDispatch();
  const [bandId, setBandId] = useState(-1);
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
    <form onSubmit={handleSubmit} method="" action="">
        <button onClick={handleCloseClick}>X</button>
      <select onChange={handleBandIdChange}>
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
      <textarea onChange={handleMessageChange} value={message}/>
      <button type='submit'>Send Invitation</button>
    </form>
  );
};

export default withRouter(ManageInvitationsForm);
