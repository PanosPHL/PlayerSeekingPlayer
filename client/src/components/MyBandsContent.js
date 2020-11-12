import React from 'react';
import { useSelector } from 'react-redux';
import bandStyles from '../css-modules/MyBands.module.css';

const MyBandsContent = () => {
    const myBands = useSelector(state => Object.values(state.entities.bands).filter((band) => band.ownerId));
    return (
        <div className={bandStyles.contentContainer}>
            {
                myBands.length ?
                    myBands.map((band) => <div>{band.name}</div>) :
                    <></>
            }
        </div>
    )
}

export default MyBandsContent;