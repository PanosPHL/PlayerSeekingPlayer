import React, { useContext } from 'react';
import SearchRecordingContext from '../contexts/SearchRecordingContext';
import searchStyles from '../css-modules/Search.module.css';

const UserSearchRecordingInfo = ({ name, bio }) => {
    const {
        get: {
            showMore
        },
        set: {
            setShowMore
        }
    } = useContext(SearchRecordingContext);

    const shortBio = bio.split(' ').slice(0, 56);
    console.log(shortBio.length);

    return (
        <>
        <h3 className={searchStyles.moreAbout}>More About {name}</h3>
        {
            showMore ?
            <p
            className={searchStyles.openBio}>{bio}
            <span className={searchStyles.seeLess} onClick={() => setShowMore(false)}>See Less</span>
            </p> :
            <p className={searchStyles.closedBio}>{shortBio.join(' ') + ( shortBio.length >= 56 ? '...' : '')}
            { shortBio.length < 56 ? <></> : <span className={searchStyles.seeMore} onClick={() => setShowMore(true)}>See More</span> }
            </p>
            }
        </>
    )
}

export default UserSearchRecordingInfo;