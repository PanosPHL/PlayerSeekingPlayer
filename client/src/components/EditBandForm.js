import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EditBandForm = () => {
    const [name, setName] = useState();
    const [styleId, setStyleId] = useState();

    const styles = useSelector(state => Object.values(state.entities.styles));

    return (
        <form method="" action="">
            <input name="bandName" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <select name="bandStyle" onChange={(e) => setStyleId(e.target.value)}>
                    <option value="-1">Select a style</option>
                    {
                        styles.length ?
                            styles.map((style, i) => <option key={`style-${i + 1}`} value={style.id}>{style.name}</option>) :
                            <></>
                    }
            </select>
        </form>
    )
}

export default EditBandForm;