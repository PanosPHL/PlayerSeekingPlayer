import React, { useContext } from 'react';
import ReactCrop from 'react-image-crop';
import ProfilePicFormContext from '../contexts/ProfilePicFormContext';

const Cropper = ({ src }) => {
    let { get: {
        crop,
        picRef
        },
        set: {
            setCrop
        } } = useContext(ProfilePicFormContext);
    return (
        <ReactCrop src={src} crop={crop} onImageLoaded={image => { picRef.current = image }} onChange={newCrop => setCrop(newCrop)} />
    )
}

export default Cropper;