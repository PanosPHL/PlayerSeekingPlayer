import React, { useContext } from 'react';
import OverviewContext from '../../contexts/OverviewContext';
import aboutStyles from '../../css-modules/About.module.css';

const OverviewEditButton = ({ isOwner }) => {
    const { handleEditClick } = useContext(OverviewContext);

    return (
        <>
        {
            isOwner ?
            <button onClick={handleEditClick} className={aboutStyles.editButton}><i className="fas fa-pencil-alt"></i></button> :
            <></>
        }
        </>
    )
}

export default OverviewEditButton;