import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBioModal } from '../store/ui/profilePage';
import BioForm from './BioForm';
import aboutStyles from '../css-modules/About.module.css';

const BioFormModal = () => {
    const dispatch = useDispatch();
    const { bioModal } = useSelector(state => state.ui.profilePage);
    const { userId } = useSelector(state => state.session);
    const { profileInfo: { biography: initBio } } = useSelector(state => state.entities.users[state.session.userId] || { profileInfo: {} });

    const handleCloseClick = () => {
        dispatch(toggleBioModal());
        document.body.classList.remove('noscroll');
    }

    if (bioModal) {
        return (
            <div style={{
                height: window.innerHeight,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: "1", position: "absolute",
                top: window.pageYOffset,
                overflow: 'hidden'
            }}>
                <div className={aboutStyles.bioFormModalContainer}>
                <button className={aboutStyles.modalFormClose + ' ' + aboutStyles.bioModalFormClose} onClick={handleCloseClick}><i className="fas fa-times"></i></button>
                <BioForm initBio={initBio} userId={userId}/>
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default BioFormModal;