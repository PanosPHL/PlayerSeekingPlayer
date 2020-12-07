import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setBandFormId } from '../store/session';
import { toggleEditBandModal } from '../store/ui/myBands';
import { putAndUpdateBandInfo } from '../store/bands';
import BandFormMemberRow from './BandFormMemberRow';
import bandStyles from '../css-modules/MyBands.module.css';

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
        <form className={bandStyles.editBandForm} onSubmit={handleSubmit} method="" action="">
            <h2 className={bandStyles.modalFormTitle}>Edit Band</h2>
            <button onClick={handleCloseClick}>X</button>
            <div>
            <p>
                <label className="labels" htmlFor="bandName">Band Name</label>
            </p>
            <input className="form-control" name="bandName" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <p>
                <label className="labels" htmlFor="bandStyle">Band Style</label>
            </p>
            <select className="form-control" name="bandStyle" value={styleId} onChange={(e) => setStyleId(e.target.value)}>
                    <option value="-1">Select a style</option>
                    {
                        styles.length ?
                            styles.map((style, i) => <option key={`style-${i + 1}`} value={style.id}>{style.name}</option>) :
                            <></>
                    }
            </select>
            </div>
            <div>
                { members.map((member) => <BandFormMemberRow status="confirmed" band={band} member={member}/>) }
                { pendingMembers.map((member) => <BandFormMemberRow status="pending" band={band} member={member} />) }
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default EditBandForm;