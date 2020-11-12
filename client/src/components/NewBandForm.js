import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAndAddBand } from '../store/bands';
import { toggleNewBandModal } from '../store/ui/myBands';

const NewBandForm = ({ bandId }) => {
    const dispatch = useDispatch();
    const band = useSelector(state => state.entities.bands[bandId]);
    const ownerId = useSelector(state => state.session.userId);
    const styles = useSelector(state => Object.values(state.entities.styles));
    const [name, setName] = useState(band ? band.name : '');
    const [styleId, setStyleId] = useState(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(postAndAddBand(name, true, ownerId, styleId));
    }

    return (
            <form onSubmit={handleSubmit} method="" action="">
                <button onClick={() => dispatch(toggleNewBandModal())}><i className="fas fa-times"></i></button>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <select onChange={(e) => setStyleId(Number(e.target.value))}>
                    <option value="-1">Select a style</option>
                    {
                        styles.length ?
                            styles.map((style, i) => <option key={`style-${i + 1}`} value={style.id}>{style.name}</option>) :
                            <></>
                    }
                </select>
                <button type='submit'>Submit</button>
            </form>
    )
}

export default NewBandForm;