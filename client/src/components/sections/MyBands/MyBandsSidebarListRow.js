import React from 'react';
import { useDispatch } from 'react-redux';
import { setBandFormId, setBandFormType } from '../../../store/session';
import { toggleEditBandModal } from '../../../store/ui/myBands';
import bandStyles from '../../../css-modules/MyBands.module.css';

const MyBandsSidebarListRow = ({ band }) => {
    const dispatch = useDispatch();

    const handleBandClick = () => {
        dispatch(setBandFormId(band.id));
        dispatch(setBandFormType("view"));
        dispatch(toggleEditBandModal());
    }

    return (
        <div onClick={handleBandClick} className={bandStyles.sidebarBandRow}><h4>{band.name}</h4></div>
    )
}

export default MyBandsSidebarListRow;
