import React from 'react';
import MyBandsListCard from './MyBandsListCard';
import bandStyles from '../css-modules/MyBands.module.css';

const MyBandsList = ({ bands, type }) => {
    return (
        <div className={bandStyles.bandListContainer}>
            <h2 className={bandStyles.bandListHeader}>{type}</h2>
            {
                bands.length ?
                    bands.map((band, i) => <MyBandsListCard owned={type === 'Bands You Own' ? true : false} key={`band-${i + 1}`} band={band}/>) :
                    <></>
            }
        </div>
    );
}

export default MyBandsList;