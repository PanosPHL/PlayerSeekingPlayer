import React from 'react';
import bandStyles from '../../../css-modules/MyBands.module.css';

const MyBandsSidebarList = ({ bands }) => {
    return (
        <div className={bandStyles.sidebarBandList}>
            {
            bands.length ?
            bands.map((band, i) => <div key={`sidebar-band-${i + 1}`} className={bandStyles.sidebarBandRow}><h4>{band.name}</h4></div>) :
            <></>
            }
        </div>
    )
}

export default MyBandsSidebarList;