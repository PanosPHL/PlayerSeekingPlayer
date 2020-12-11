import React from 'react';
import MyBandsSidebar from '../sections/MyBands/MyBandsSidebar';
import { useSelector } from 'react-redux';
import bandStyles from '../../css-modules/MyBands.module.css';
import MyBandsContent from '../sections/MyBands/MyBandsContent';

const MyBands = () => {
    const ownedBands = useSelector(state => Object.values(state.entities.bands).filter((band) => state.session.userId === band.ownerId && band.isPublic));
    const memberBands = useSelector(state => Object.values(state.entities.bands).filter((band) => band.members.includes(state.session.userId) && band.ownerId !== state.session.userId && band.isPublic));

    return (
        <div className={bandStyles.pageContainer}>
            <MyBandsSidebar ownedBands={ownedBands} memberBands={memberBands}/>
            <MyBandsContent ownedBands={ownedBands} memberBands={memberBands}/>
        </div>
    )
}

export default MyBands;