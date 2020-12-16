import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfilePicForm } from '../../store/ui/profilePage'
import ModalContainer from './ModalContainer';
import ProfilePicForm from '../forms/ProfilePicForm';
import ProfilePicFormContext from '../../contexts/ProfilePicFormContext';
import styles from '../../css-modules/ProfilePicForm.module.css';

const ProfilePicFormModal = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.entities.users[state.session.userId];
    })
    const { pictures: { profilePicModal } } = useSelector(state => state.ui.profilePage);
    const [pic, setPic] = useState(null);
    const picRef = useRef(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [fileName, setFileName] = useState('');

    const handleCloseClick = (event) => {
        if (event.target.id === 'modal-container') {
            dispatch(toggleProfilePicForm());
        }
    }

    const value = {
        get: {
            crop,
            fileName,
            pic,
            picRef,
            user
        },
        set: {
            setCrop,
            setFileName,
            setPic
        }
    };

    if (profilePicModal) {
        return (
            <ProfilePicFormContext.Provider value={value}>
                <ModalContainer onClick={handleCloseClick}>
                    <div id='pic-form-container' className={styles.picFormModalContainer}>
                        <ProfilePicForm />
                    </div>
                </ModalContainer>
            </ProfilePicFormContext.Provider>
        )
    }

    return (
        <></>
    );
}

export default ProfilePicFormModal;