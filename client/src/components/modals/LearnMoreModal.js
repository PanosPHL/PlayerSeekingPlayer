import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLearnMoreModal } from '../../store/ui/authPages';
import ModalContainer from './ModalContainer';
import LearnMoreRecording from '../sections/AuthPages/LearnMoreRecording';
import authStyles from '../../css-modules/AuthPages.module.css';

const LearnMoreModal = () => {
    const dispatch = useDispatch();
    const { learnMoreModal } = useSelector(state => state.ui.authPages);

    const handleCloseClick = () => {
        dispatch(toggleLearnMoreModal());
    }

    if (learnMoreModal) {
        return (
            <ModalContainer>
                <div className={authStyles.learnMoreContainer}>
                    <button onClick={handleCloseClick} className={authStyles.modalClose}><i className="fas fa-times"></i></button>
                    <LearnMoreRecording videoId="0M5tq9K65D8"/>
                    <p className={authStyles.learnMoreText}>
                        Learn how to use Player Seeking Player from its developer, Panayiotis Dimopoulos!
                    </p>
                </div>
            </ModalContainer>
            )
    }

    return (
        <></>
    )

}

export default LearnMoreModal;