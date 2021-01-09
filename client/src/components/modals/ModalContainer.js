import React, { useEffect } from 'react';

const ModalContainer = (props) => {
  useEffect(() => {
    document.body.classList.add('noscroll');

    return () => {
      document.body.classList.remove('noscroll');
    };
  }, []);

  return (
    <div
      id="modal-container"
      onClick={props.onClick || null}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: '2',
        position: 'absolute',
        overflow: 'hidden',
        top: window.pageYOffset,
      }}
    >
      {props.children}
    </div>
  );
};

export default ModalContainer;
