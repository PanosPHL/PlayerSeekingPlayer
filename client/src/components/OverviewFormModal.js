import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleOverviewModal } from '../store/ui/profilePage';
import OverviewForm from './OverviewForm';
import aboutStyles from '../css-modules/About.module.css';

const OverviewFormModal = ({ location }) => {
    const dispatch = useDispatch();
    const { overviewFormModal: { display: overviewFormModal } } = useSelector(state => state.ui.profilePage);
    const instruments = useSelector(state => Object.values(state.entities.instruments));
    const styles = useSelector(state => Object.values(state.entities.styles));
    const user = useSelector(state => state.entities.users[parseInt(location.pathname.split('/')[2])]);

    const handleCloseClick = () => {
        dispatch(toggleOverviewModal());
    }

    if (overviewFormModal) {
        return (
            <div style={{
                height: window.innerHeight,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: "1", position: "absolute",
                top: window.pageYOffset,
                overflow: 'hidden'
            }}>
                <div className={aboutStyles.overviewFormModalContainer}>
                    <button onClick={handleCloseClick}><i className="fas fa-times"></i></button>
                    <OverviewForm
                    initDOB={user ? user.dateOfBirth : null}
                    instruments={instruments ? instruments : null}
                    userInstruments={user ? user.profileInfo.instruments : null}
                    styles={styles ? styles : null}
                    userStyles={user ? user.profileInfo.styles : null}
                    initLocation={user ? user.profileInfo.location : null}
                    initLat={user ? user.lat : null}
                    initLng={user ? user.lng : null}/>
                </div>
            </div>
        )
    }

    return (
        <></>
    )
}

export default withRouter(OverviewFormModal);