import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleNewBandModal } from '../store/ui/myBands';
import bandStyles from '../css-modules/MyBands.module.css';

const MyBandsSidebar = ({ ownedBands, memberBands }) => {
    const dispatch = useDispatch();


    const handleNewBandClick = () => {
        dispatch(toggleNewBandModal());
    }

    return (
        <div className={bandStyles.sidebarContainer}>
            <div>
            <h2>My Bands</h2>
            <div>
                <div className={bandStyles.yourBandsBar}>
                <div className={bandStyles.bandsBarNotesAndText}>
                <div className={bandStyles.bandsBarNotes}>
                <i className="fas fa-music"></i>
                </div>
                <h3 className={bandStyles.bandsBarText}>{
                    ownedBands.length + memberBands.length === 1 ?
                    "Your 1 Band" :
                    ownedBands.length + memberBands.length > 1 ?
                    `Your ${ownedBands.length + memberBands.length} Bands` :
                    "Join a Band!"
                    }</h3>
                </div>
                <button className={bandStyles.bandsBarCollapse}><i className="fas fa-chevron-up"></i></button>
                </div>
                <div></div>
                <button
                className={bandStyles.createBandButton}
                onClick={handleNewBandClick}><span className={bandStyles.plus}><i className="fas fa-plus"></i></span> Create Band</button>
            </div>
            </div>
        </div>
    )
}

export default MyBandsSidebar;