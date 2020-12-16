import React, { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import aboutStyles from '../../css-modules/About.module.css';

const BioEditButton = ({ isOwner }) => {
    const { handleEditClick } = useContext(BioContext);

    return (
        <>
        { isOwner ? <button onClick={handleEditClick} className={aboutStyles.editButton}><i className="fas fa-pencil-alt"></i></button> :
        <></>}
        </>
    )
}

export default BioEditButton;