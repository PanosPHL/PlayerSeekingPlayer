import React from 'react';
import MyBandsSidebar from './MyBandsSidebar';
import bandStyles from '../css-modules/MyBands.module.css';
import MyBandsContent from './MyBandsContent';

const MyBands = () => {
    return (
        <div className={bandStyles.pageContainer}>
            <MyBandsSidebar />
            <MyBandsContent />
        </div>
    )
}

export default MyBands;