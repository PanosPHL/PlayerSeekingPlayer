import React from 'react';
import bandStyles from '../../../css-modules/MyBands.module.css';
import MyBandsList from './MyBandsList';

const MyBandsContent = ({ ownedBands, memberBands }) => {
    return (
        <div className={bandStyles.contentContainer}>
            <MyBandsList bands={ownedBands} type={"Bands You Own"}/>
            <MyBandsList bands={memberBands} type={"Bands Where You're A Member"}/>
        </div>
    )
}

export default MyBandsContent;