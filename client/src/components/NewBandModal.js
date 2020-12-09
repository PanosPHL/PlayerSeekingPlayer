import React from 'react';
import { useSelector } from 'react-redux';
import ModalContainer from './ModalContainer';
import NewBandForm from './NewBandForm';

const NewBandModal = () => {
    const { newBandModal } = useSelector(state => state.ui.myBands);

    if (newBandModal) {
        return (
            <ModalContainer>
                <NewBandForm />
            </ModalContainer>
        );
    }

    return (
        <></>
    );
}

export default NewBandModal;