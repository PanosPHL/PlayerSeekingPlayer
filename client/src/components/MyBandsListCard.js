import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delBand } from '../store/bands';
import bandStyles from '../css-modules/MyBands.module.css';

const MyBandsListCard = ({ band, owned }) => {
    const dispatch = useDispatch();
    const style = useSelector(state => state.entities.styles[band.styleId]);

    const handleDelClick = async () => {
        const res = await dispatch(delBand(band.id));
    }

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
                <button onClick={handleDelClick} className={bandStyles.bandListCardButton}><i className="fas fa-trash-alt"></i> Delete</button>
                </> :
                <></>
            }
            </div>
        </div>
    );
}
export default MyBandsListCard;