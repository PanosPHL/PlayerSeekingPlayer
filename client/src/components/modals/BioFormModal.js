import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBioModal } from '../../store/ui/profilePage';
import ModalContainer from './ModalContainer';
import BioForm from '../forms/BioForm';
import aboutStyles from '../../css-modules/About.module.css';

const BioFormModal = () => {
  const dispatch = useDispatch();
  const { bioModal } = useSelector((state) => state.ui.profilePage);
  const { userId } = useSelector((state) => state.session);
  const {
    profileInfo: { biography: initBio },
  } = useSelector(
    (state) => state.entities.users[state.session.userId] || { profileInfo: {} }
  );

  if (bioModal) {
    return (
      <ModalContainer>
        <div className={aboutStyles.bioFormModalContainer}>
          <BioForm initBio={initBio} userId={userId} />
        </div>
      </ModalContainer>
    );
  } else {
    return <></>;
  }
};

export default BioFormModal;
