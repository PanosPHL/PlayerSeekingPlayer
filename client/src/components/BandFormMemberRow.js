import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndDeleteMember } from '../store/bands';

const BandFormMemberRow = ({ member, band, status }) => {
    const dispatch = useDispatch();
    const isOwner = band && member ? band.ownerId === member.id : null;
    const instruments = useSelector(state => member.profileInfo.instruments.map((instrumentId) => state.entities.instruments[instrumentId]));

    const handleRemoveMemberClick = async (e) => {
        e.preventDefault();
        await dispatch(fetchAndDeleteMember(band.id, member.id, status === "confirmed"))
    }

    return (
        <div>
            <div>
            <h5>{member.firstName + " " + member.lastName}</h5>
            <span>{isOwner ? "(Owner)" : status === "confirmed" ? `(${instruments.map((instrument) => instrument.name).join(', ')})` : "(Pending)"}</span>
            </div>
            { !isOwner ? <button onClick={handleRemoveMemberClick}>X</button> : <></>}
        </div>
    )
}

export default BandFormMemberRow;
