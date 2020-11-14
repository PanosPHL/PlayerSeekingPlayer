import React from 'react';

const MyBandsSidebarList = ({ bands }) => {
    return (
        <div>
            {
            bands.length ?
            bands.map((band) => <div>{band.name}</div>) :
            <></>
            }
        </div>
    )
}

export default MyBandsSidebarList;