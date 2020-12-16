import React from 'react';
import bandStyles from '../../../css-modules/MyBands.module.css';
import MyBandsSidebarListRow from './MyBandsSidebarListRow';

const MyBandsSidebarList = ({ bands }) => {
    return (
        <div className={bandStyles.sidebarBandList}>
            {
            bands.length ?
            bands.map((band, i) => <MyBandsSidebarListRow band={band} key={`sidebar-band-${i + 1}`} />) :
            <></>
            }
        </div>
    )
}

export default MyBandsSidebarList;