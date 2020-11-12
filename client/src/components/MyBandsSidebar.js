import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleNewBandModal } from '../store/ui/myBands';
import bandStyles from '../css-modules/MyBands.module.css';

const MyBandsSidebar = () => {
    const dispatch = useDispatch();


    const handleNewBandClick = () => {
        dispatch(toggleNewBandModal());
    }

    return (
        <div className={bandStyles.sidebarContainer}>
            <div>
            <h2>My Bands</h2>
            <div>
                <div className={bandStyles.yourBandsContainer}>
                <div>
                <i className="fas fa-music"></i>
                </div>
                <h3>Your 1 Bands</h3>
                <button>&#94;</button>
                </div>
                <button onClick={handleNewBandClick}>Create Band <i className="fas fa-plus"></i></button>
            </div>
            </div>
        </div>
    )
}

export default MyBandsSidebar;