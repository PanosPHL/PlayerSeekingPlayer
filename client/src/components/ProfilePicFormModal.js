import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfilePicForm } from '../store/ui/profilePage'
import ModalContainer from './ModalContainer';
import ProfilePicForm from './ProfilePicForm';
import ProfilePicFormContext from '../contexts/ProfilePicFormContext';
import styles from '../css-modules/ProfilePicForm.module.css';

const ProfilePicFormModal = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.entities.users[state.session.userId];
    })
    const { pictures: { profilePicModal } } = useSelector(state => state.ui.profilePage);
    const [pic, setPic] = useState(null);
    const picRef = useRef(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });

    const handleCloseClick = () => {
        dispatch(toggleProfilePicForm());
    }

    const value = {
        get: {
            crop,
            pic,
            picRef,
            user
        },
        set: {
            setPic,
            setCrop
        }
    };

    if (profilePicModal) {
        return (
            <ModalContainer>
                <ProfilePicFormContext.Provider value={value}>
                <div className={styles.picFormModalContainer}>
                    <button onClick={handleCloseClick}>X</button>
                    <ProfilePicForm />
                </div>
                </ProfilePicFormContext.Provider>
            </ModalContainer>
        )
    }

    return (
        <></>
    );
}

export default ProfilePicFormModal;