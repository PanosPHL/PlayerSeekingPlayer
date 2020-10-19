import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleOverviewModal } from '../store/ui/profilePage';
import OverviewForm from './OverviewForm';

const OverviewFormModal = ({ location }) => {
    const dispatch = useDispatch();
    const { overviewFormModal } = useSelector(state => state.ui.profilePage);
    const instruments = useSelector(state => Object.values(state.entities.instruments));
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
                <div>
                    <button onClick={handleCloseClick}><i className="fas fa-times"></i></button>
                    <OverviewForm
                    initDOB={user ? user.dateOfBirth : null}
                    instruments={instruments ? instruments : null}/>
                </div>
            </div>
        )
    }

    return (
        <></>
    )
}

export default withRouter(OverviewFormModal);