import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './ModalContainer';

const LearnMoreModal = () => {
    const dispatch = useDispatch();
    const { learnMoreModal } = useSelector(state => state.ui.authPages);

    if (learnMoreModal) {
        return (
            <ModalContainer>
                <h1 style={ { color: "white" } }>Hi mom!</h1>
            </ModalContainer>
            )
    }

    return (
        <></>
    )

}

export default LearnMoreModal;