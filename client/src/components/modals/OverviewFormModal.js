import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOverviewModal } from '../../store/ui/profilePage';
import OverviewForm from '../forms/OverviewForm';
import Errors from '../universal/Errors';
import ModalContainer from './ModalContainer';
import aboutStyles from '../../css-modules/About.module.css';

const OverviewFormModal = () => {
    const dispatch = useDispatch();
    const { overviewFormModal: { display: overviewFormModal } } = useSelector(state => state.ui.profilePage);
    const { userId } = useSelector(state => state.session);
    const instruments = useSelector(state => Object.values(state.entities.instruments));
    const styles = useSelector(state => Object.values(state.entities.styles));
    const user = useSelector(state => state.entities.users[userId]);
    const errors = useSelector(state => state.errors);

    const handleCloseClick = () => {
        dispatch(toggleOverviewModal());
    }

    if (overviewFormModal) {
        return (
            <ModalContainer>
                <div className={aboutStyles.overviewFormModalContainer}>
                    <button className={aboutStyles.modalFormClose} onClick={handleCloseClick}><i className="fas fa-times"></i></button>
                    { errors && errors.length ?
                    <Errors errors={errors}
                    className={aboutStyles.overviewErrors}
                    divStyle={aboutStyles.overviewErrorWrapper}/>
                    : <></> }
                    <OverviewForm
                    initDOB={user ? user.dateOfBirth : null}
                    instruments={instruments ? instruments : null}
                    userInstruments={user ? user.profileInfo.instruments : null}
                    styles={styles ? styles : null}
                    userStyles={user ? user.profileInfo.styles : null}
                    initLocation={user ? user.profileInfo.location : null}
                    initLat={user ? user.lat : null}
                    initLng={user ? user.lng : null}
                    userId={user ? user.id : null}/>
                </div>
            </ModalContainer>
        )
    }

    return (
        <></>
    )
}

export default OverviewFormModal;