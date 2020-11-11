import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { putAndUpdateProfilePic } from '../store/users';
import { toggleProfilePicForm } from '../store/ui/profilePage';
import Cropper from './Cropper';
import ProfilePicFormContext from '../contexts/ProfilePicFormContext';
import 'react-image-crop/dist/ReactCrop.css';
import styles from '../css-modules/ProfilePicForm.module.css';

const ProfilePicForm = () => {
    const dispatch = useDispatch();
    const fileInput = useRef();
    const {
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
        } } = useContext(ProfilePicFormContext);

    useEffect(() => {
        return () => {
            setPic(null);
            setCrop({ aspect: 1 / 1 });
            setFileName('');
            document.body.classList.remove('noscroll');
        }
    }, [setPic, setCrop, setFileName]);

    const handleInput = (event) => {
        const file = event.target.files[0];
        const nameSplit = file.name.split('.')[1].toLowerCase();

        if (nameSplit === 'png' || nameSplit === 'jpeg') {
            setFileName(file.name);
            setCrop({ aspect: 1 / 1 });
            setPic(URL.createObjectURL(file));
        }
    }

    const getCroppedImg = (img, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            let imgBase64 = canvas.toDataURL('image/png', 1.0);

            if (!imgBase64) {
                console.error('Canvas is empty');
                return;
            }

            resolve(imgBase64);
        });
    }

    const handleLabelClick = () => {
        fileInput.current.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!crop.width && !crop.height) {
            return;
        }
        const res = await dispatch(putAndUpdateProfilePic(user.id, await getCroppedImg(picRef.current, crop)));

        if (res.ok) {
            dispatch(toggleProfilePicForm());
        }
    }

    return (
        <>
            <div>
                <label
                className={styles.uploadLabel}
                onClick={handleLabelClick}>{fileName || "Upload Image"}</label>
                <input
                    ref={fileInput}
                    className={styles.fileUpload}
                    onInput={handleInput}
                    type='file'
                    name='profile-pic'
                    accept='image/png, image.jpeg' />
            </div>
            {
                pic ?
                    <div>
                        <form
                            className={styles.picForm}
                            onSubmit={handleSubmit}
                            method=''
                            action=''>
                            <Cropper src={pic} />
                            <button className={styles.submitButton} type='submit'>Submit</button>
                        </form>
                    </div> :
                    <></>
            }
        </>
    )
}

export default ProfilePicForm;