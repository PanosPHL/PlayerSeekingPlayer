import React, { useEffect } from 'react';

const ModalContainer = (props) => {
    useEffect(() => {
        document.body.classList.add('noscroll');

        return () => {
            document.body.classList.remove('noscroll');
        }
    }, [])

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