import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAndDeleteMember } from '../../store/bands';
import bandStyles from '../../css-modules/MyBands.module.css';

const BandFormMemberRow = ({ member, band, status }) => {
    const dispatch = useDispatch();
    const isOwner = band && member ? band.ownerId === member.id : null;
    const instruments = useSelector(state => member.profileInfo.instruments.map((instrumentId) => state.entities.instruments[instrumentId]));

    const handleRemoveMemberClick = async (e) => {
        e.preventDefault();
        await dispatch(fetchAndDeleteMember(band.id, member.id, status === "confirmed"))
    }

    return (
        <div className={bandStyles.bandFormMemberRow}>
                <div className={bandStyles.bandFormMemberRowPicAndInfo}>
                    <img className={bandStyles.bandFormMemberRowPic} src={member.profileInfo.profilePic || '/images/default_profile_photo.jpg'} alt={`${member.firstName} ${member.lastName}`}/>
                    <div>
                    <h5 className={bandStyles.bandFormMemberRowName}>{member.firstName + " " + member.lastName}</h5>
                    <span className={bandStyles.bandFormMemberRowInfo}>{isOwner ? `Owner: ${instruments.map((instrument) => instrument.name).join(', ')}` : status === "confirmed" ? `${instruments.map((instrument) => instrument.name).join(', ')}`
                    : `Pending Member: ${instruments.map((instrument) => instrument.name).join(', ')}`}</span>
                    </div>
                </div>
            { !isOwner ? <button className={bandStyles.removeMemberButton} onClick={handleRemoveMemberClick}><i className="fas fa-times"></i></button> : <></>}
        </div>
    )
}

export default BandFormMemberRow;
