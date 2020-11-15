import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { toggleManageInvitationModal } from '../store/ui/invitations';

const ManageInvitationsForm = ({ ownedBands }) => {
const dispatch = useDispatch();
  const [bandId, setBandId] = useState(-1);
  const [message, setMessage] = useState("");

  const handleBandIdChange = (e) => {
    setBandId(Number(e.target.value));
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseClick = () => {
      dispatch(toggleManageInvitationModal());
      document.body.classList.remove('noscroll');
  }

  const handleSubmit = (e) => {
      e.preventDefault();
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

export default ManageInvitationsForm;
