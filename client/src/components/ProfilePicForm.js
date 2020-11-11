import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { putAndUpdateProfilePic } from '../store/users';
import Cropper from './Cropper';
import ProfilePicFormContext from '../contexts/ProfilePicFormContext';
import 'react-image-crop/dist/ReactCrop.css';
import styles from '../css-modules/ProfilePicForm.module.css';
import { toggleProfilePicForm } from '../store/ui/profilePage';

const ProfilePicForm = () => {
    const dispatch = useDispatch();
    const {
        get: {
            crop,
            pic,
            picRef,
            user
        },
        set: {
            setPic,
            setCrop
        } } = useContext(ProfilePicFormContext);

    useEffect(() => {
        return () => {
            setPic(null);
            setCrop({ aspect: 1 / 1 });
            document.body.classList.remove('noscroll');
        }
    }, [setPic, setCrop]);

    const handleInput = (event) => {
        const file = event.target.files[0];
        const nameSplit = file.name.split('.')[1].toLowerCase();

        if (nameSplit === 'png' || nameSplit === 'jpeg') {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(putAndUpdateProfilePic(user.id, await getCroppedImg(picRef.current, crop)));

        if (res.ok) {
            dispatch(toggleProfilePicForm());
        }
    }

    return (
        <div>
            <div>
                <label>Upload Image</label>
                <input onInput={handleInput} type='file' name='profile-pic' accept='image/png, image.jpeg' />
            </div>
            {
                pic ?
                    <>
                        <form
                        className={styles.picForm}
                        onSubmit={handleSubmit}
                        method=''
                        action=''>
                            <Cropper src={pic} />
                            <button type='submit'>Submit</button>
                        </form>
                    </> :
                    <></>
            }
        </div>
    )
}

export default ProfilePicForm;