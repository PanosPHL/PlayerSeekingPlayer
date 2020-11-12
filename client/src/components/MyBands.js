import React from 'react';
import MyBandsSidebar from './MyBandsSidebar';
import { useSelector } from 'react-redux';
import bandStyles from '../css-modules/MyBands.module.css';
import MyBandsContent from './MyBandsContent';

const MyBands = () => {
    const ownedBands = useSelector(state => Object.values(state.entities.bands).filter((band) => state.session.userId === band.ownerId));
    const memberBands = useSelector(state => Object.values(state.entities.bands).filter((band) => band.members.includes(state.session.userId) && band.ownerId !== state.session.userId));

    return (
        <div className={bandStyles.pageContainer}>
            <MyBandsSidebar ownedBands={ownedBands} memberBands={memberBands}/>
            <MyBandsContent ownedBands={ownedBands} memberBands={memberBands}/>
        </div>
    )
}

export default MyBands;