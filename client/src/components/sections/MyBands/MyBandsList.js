import React from 'react';
import MyBandsListCard from './MyBandsListCard';
import bandStyles from '../../../css-modules/MyBands.module.css';

const MyBandsList = ({ bands, type }) => {
    return (
        <div className={bandStyles.bandListContainer + (!(type === "Bands You Own") ? " " + bandStyles.memberBandList : "")}>
                <h2 className={bandStyles.bandListHeader}>{type}</h2>
                {
                    bands.length ?
                        bands.map((band, i) => <MyBandsListCard owned={type === 'Bands You Own' ? true : false} key={`band-${i + 1}`} band={band}/>) :
                <h3 className={bandStyles.defaultBandList}>{type === "Bands You Own" ? "You Currently Own No Bands" : "You Are Not Currently A Member Of Any Bands"}</h3>
                }
        </div>
    );
}

export default MyBandsList;