import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAndAddBand } from '../../store/bands';
import { toggleNewBandModal } from '../../store/ui/myBands';
import { setErrors, clearErrors } from '../../store/errors';
import Errors from '../universal/Errors';
import bandStyles from '../../css-modules/MyBands.module.css';

const NewBandForm = ({ bandId }) => {
    const dispatch = useDispatch();
    const band = useSelector(state => state.entities.bands[bandId]);
    const ownerId = useSelector(state => state.session.userId.toString());
    const styles = useSelector(state => Object.values(state.entities.styles));
    const [name, setName] = useState(band ? band.name : '');
    const [styleId, setStyleId] = useState('');
    const errors = useSelector(state => state.errors);

    useEffect(() => {
        dispatch(clearErrors());
    }, [name, styleId, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(postAndAddBand(name, true, ownerId, styleId));

        if (res.ok) {
            dispatch(toggleNewBandModal());
            return
        }

        dispatch(setErrors(res.data.errors));
    }

    return (
            <form className={bandStyles.newBandForm} onSubmit={handleSubmit} method="" action="">
                <h2 className={bandStyles.modalFormTitle}>Create a Band</h2>
                <button className={bandStyles.modalFormClose} onClick={() => dispatch(toggleNewBandModal())}><i className="fas fa-times"></i></button>
                {
                errors.length ? <Errors className={bandStyles.editBandErrorList} divStyle={bandStyles.newBandFormErrors} errors={errors}/> : <></>
                }
                <div className={bandStyles.formControlGroup + " form-control-group"}>
                <p>
                <label className="labels" htmlFor="bandName">Band Name</label>
                </p>
                <input className="form-control" name="bandName" type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={bandStyles.formControlGroup + " form-control-group"}>
                <p>
                    <label className="labels" htmlFor="bandStyle">Band Style</label>
                </p>
                <select className="form-control" name="bandStyle" onChange={(e) => setStyleId(e.target.value)}>
                    <option value="">Select a style</option>
                    {
                        styles.length ?
                            styles.map((style, i) => <option key={`style-${i + 1}`} value={`${style.id}`}>{style.name}</option>) :
                            <></>
                    }
                </select>
                </div>
                <button className={bandStyles.submitButton} type='submit'>Submit</button>
            </form>
    )
}

export default NewBandForm;