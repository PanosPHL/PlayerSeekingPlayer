import React from 'react';
import { useSelector } from 'react-redux';
import bandStyles from '../css-modules/MyBands.module.css';

const MyBandsListCard = ({ band, owned }) => {
    const style = useSelector(state => state.entities.styles[band.styleId]);
    return (
        <div className={bandStyles.bandListCard}>
            <div className={bandStyles.bandListCardText}>
                <h3>{band.name}</h3>
                <span>Style: { style.name }</span>
            </div>
            <div className={bandStyles.bandListCardButtonContainer}>
               {
               owned ?
               <>
               <button className={bandStyles.bandListCardButton}><i className="fas fa-pencil-alt"></i> Edit</button>
                <button className={bandStyles.bandListCardButton}><i className="fas fa-trash-alt"></i> Delete</button>
                </> :
                <></>
            }
            </div>
        </div>
    );
}
export default MyBandsListCard;