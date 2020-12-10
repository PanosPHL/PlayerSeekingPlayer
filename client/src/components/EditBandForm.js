import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setBandFormId } from '../store/session';
import { toggleEditBandModal } from '../store/ui/myBands';
import { putAndUpdateBandInfo } from '../store/bands';
import { setErrors, clearErrors } from '../store/errors';
import BandFormMemberRow from './BandFormMemberRow';
import Errors from './Errors';
import bandStyles from '../css-modules/MyBands.module.css';

const EditBandForm = () => {
    const dispatch = useDispatch();
    const band = useSelector(state => state.entities.bands[state.session.bandFormId]);
    const styles = useSelector(state => Object.values(state.entities.styles));
    const members = useSelector(state => state.entities.bands[state.session.bandFormId].members.map((memberId) => state.entities.users[memberId]));
    const pendingMembers = useSelector(state => state.entities.bands[state.session.bandFormId].pendingMembers.map((memberId) => state.entities.users[memberId]));
    const errors = useSelector(state => state.errors);

    const [name, setName] = useState(band ? band.name : '');
    const [styleId, setStyleId] = useState(band ? `${band.styleId}` : '');

    const handleCloseClick = () => {
        dispatch(toggleEditBandModal());
        dispatch(setBandFormId(null));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(putAndUpdateBandInfo(band.id, name, styleId, `${band.ownerId}`));
        if (res.ok) {
            dispatch(toggleEditBandModal());
            return;
        }

        dispatch(setErrors(res.data.errors));
    }

    useEffect(() => {
        dispatch(clearErrors());
    }, [name, styleId])

    return (
        <form className={bandStyles.editBandForm} onSubmit={handleSubmit} method="" action="">
            <h2 className={bandStyles.modalFormTitle}>Edit Band</h2>
            <button className={bandStyles.modalFormClose} onClick={handleCloseClick}><i className="fas fa-times"></i></button>
            {
                errors.length ? <Errors className={bandStyles.editBandErrorList} divStyle={bandStyles.editBandFormErrors} errors={errors}/> : <></>
            }
            <div className={bandStyles.bandFormContent}>
            <div className="form-control-group">
            <p>
                <label className="labels" htmlFor="bandName">Band Name<span className="redText">*</span></label>
            </p>
            <input className="form-control" name="bandName" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control-group">
            <p>
                <label className="labels" htmlFor="bandStyle">Band Style<span className="redText">*</span></label>
            </p>
            <select className="form-control" name="bandStyle" value={styleId} onChange={(e) => setStyleId(`${e.target.value}`)}>
                    <option value="">Select a style</option>
                    {
                        styles.length ?
                            styles.map((style, i) => <option key={`style-${i + 1}`} value={style.id}>{style.name}</option>) :
                            <></>
                    }
            </select>
            </div>
            <div className="form-control-group">
                <p className={bandStyles.bandFormMembersHeader}>
                    <label className="labels" htmlFor="members">Members</label>
                </p>
            <div className={bandStyles.bandFormMemberArea}>
                { members.map((member) => <BandFormMemberRow status="confirmed" band={band} member={member}/>) }
                { pendingMembers.map((member) => <BandFormMemberRow status="pending" band={band} member={member} />) }
            </div>
            </div>
            <div className={bandStyles.editSubmitContainer}>
            <button className={bandStyles.editSubmitButton} type="submit">Submit</button>
            </div>
            <span className={bandStyles.requiredText}><span className="redText">*</span> Required</span>
            </div>
        </form>
    )
}

export default EditBandForm;