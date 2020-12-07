import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setBandFormId } from '../store/session';
import { toggleEditBandModal } from '../store/ui/myBands';
import { putAndUpdateBandInfo } from '../store/bands';
import BandFormMemberRow from './BandFormMemberRow';

const EditBandForm = () => {
    const dispatch = useDispatch();
    const band = useSelector(state => state.entities.bands[state.session.bandFormId]);
    const styles = useSelector(state => Object.values(state.entities.styles));
    const members = useSelector(state => state.entities.bands[state.session.bandFormId].members.map((memberId) => state.entities.users[memberId]));
    const pendingMembers = useSelector(state => state.entities.bands[state.session.bandFormId].pendingMembers.map((memberId) => state.entities.users[memberId]));

    const [name, setName] = useState(band ? band.name : '');
    const [styleId, setStyleId] = useState(band ? band.styleId : '-1');

    const handleCloseClick = () => {
        dispatch(toggleEditBandModal());
        dispatch(setBandFormId(null));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(putAndUpdateBandInfo(band.id, name, styleId, `${band.ownerId}`));
        if (res.ok) {
            dispatch(toggleEditBandModal());
        }
    }

    return (
        <form onSubmit={handleSubmit} method="" action="">
            <button onClick={handleCloseClick}>X</button>
            <input name="bandName" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <select name="bandStyle" value={styleId} onChange={(e) => setStyleId(e.target.value)}>
                    <option value="-1">Select a style</option>
                    {
                        styles.length ?
                            styles.map((style, i) => <option key={`style-${i + 1}`} value={style.id}>{style.name}</option>) :
                            <></>
                    }
            </select>
            <div>
                { members.map((member) => <BandFormMemberRow status="confirmed" band={band} member={member}/>) }
                { pendingMembers.map((member) => <BandFormMemberRow status="pending" band={band} member={member} />) }
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default EditBandForm;