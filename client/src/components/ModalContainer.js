import React from 'react';

const ModalContainer = (props) => {
    return (
        <div
        id='modal-container'
        onClick={props.onClick || null}
        style={{
            height: window.innerHeight,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: "1", position: "absolute",
            top: window.pageYOffset,
            overflow: 'hidden'
        }}>
            {props.children}
        </div>
    )
}

export default ModalContainer;