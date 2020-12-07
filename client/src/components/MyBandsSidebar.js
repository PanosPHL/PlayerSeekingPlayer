import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNewBandModal, toggleSidebarBandList } from '../store/ui/myBands';
import bandStyles from '../css-modules/MyBands.module.css';
import MyBandsSidebarList from './MyBandsSidebarList';

const MyBandsSidebar = ({ ownedBands, memberBands }) => {
    const dispatch = useDispatch();
    const { sidebarBandList } = useSelector(state => state.ui.myBands);

    const handleNewBandClick = () => {
        dispatch(toggleNewBandModal());
    }

    const handleListToggleClick = () => {
        dispatch(toggleSidebarBandList())
    }

    return (
        <div className={bandStyles.sidebarContainer}>
            <div>
            <h2 className={bandStyles.sidebarHeader}>My Bands</h2>
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
                <button onClick={handleListToggleClick}
                className={sidebarBandList ? bandStyles.bandsBarCollapse : bandStyles.bandsBarExpand}>
                    { sidebarBandList ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }
                </button>
                </div>
                { sidebarBandList && (ownedBands.length + memberBands.length) ? <MyBandsSidebarList bands={ownedBands.concat(memberBands)}/> : <></>}
                <button
                className={bandStyles.createBandButton}
                onClick={handleNewBandClick}><span className={bandStyles.plus}><i className="fas fa-plus"></i></span> Create Band</button>
            </div>
            </div>
        </div>
    )
}

export default MyBandsSidebar;