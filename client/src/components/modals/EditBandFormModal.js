import React from 'react';
import { useSelector } from 'react-redux';
import EditBandForm from '../forms/EditBandForm';
import ModalContainer from './ModalContainer';

const EditBandFormModal = () => {
    const { editBandModal } = useSelector(state => state.ui.myBands);

    if (editBandModal) {
        return (
            <ModalContainer>
                <EditBandForm />
            </ModalContainer>
        )
    }

    return (
        <></>
    )
}

export default EditBandFormModal;
