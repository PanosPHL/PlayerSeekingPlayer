import React from 'react';

const MyBandsList = ({ bands, type }) => {
    return (
        <div>
            <h3>{type}</h3>
            {
                bands.length ?
                    bands.map((band) => <div>{band.name}</div>) :
                    <></>
            }
        </div>
    );
}

export default MyBandsList;