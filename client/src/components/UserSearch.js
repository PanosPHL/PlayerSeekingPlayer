import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserSearchImage from './UserSearchImage';
import SearchResultContext from '../contexts/SearchResultContext';
import searchStyles from '../css-modules/Search.module.css';

const UserSearch = ({ id, first, last }) => {
    const splitRegex = /\s\d+,\sUSA/;
    const userInfo = useSelector(state => state.entities.users[id]);
    const userInstruments = useSelector(state => {
        return userInfo ? userInfo.profileInfo.instruments.map((instrument) => {
            return state.entities.instruments[instrument].name
        }) : null
    });
    const userStyles = useSelector(state => {
        return userInfo ? userInfo.profileInfo.styles.map((style) => {
            return state.entities.styles[style].name
        }) : null
    });

    const {
        set: {
            setActiveResult
        }
    } = useContext(SearchResultContext);

    return (
        <div className={searchStyles.userContainer + (first ? " " + searchStyles.firstUser : last ? " " + searchStyles.lastUser : "")} onClick={() => setActiveResult(id)}>
            <UserSearchImage userId={id}/>
            <div className={searchStyles.resultTextContainer}>
            <div className={searchStyles.nameAndLocation}>
                <Link to={`/profiles/${id}`}>
                    <h3>{userInfo.firstName + " " + userInfo.lastName}</h3>
                </Link>
                <h3>{userInfo.profileInfo.location.split(splitRegex)[0]}</h3>
            </div>
            <p className={searchStyles.subText}>Instrument(s): {userInstruments.length === 3 ?
                userInstruments.slice(0, userInstruments.length - 1).join(', ') + ", and " + userInstruments[userInstruments.length - 1]
                : userInstruments.length === 2 ?
                    userInstruments.join(' and ') : userInstruments.length === 1 ? userInstruments[0] :
                        <></>}
            </p>
            <p className={searchStyles.subText}>Style(s): {userStyles.length === 3 ?
                userStyles.slice(0, userStyles.length - 1).join(', ') + ", and " + userStyles[userStyles.length - 1]
                : userStyles.length === 2 ?
                    userStyles.join(' and ') : userStyles.length === 1 ? userStyles[0] :
                        <></>}
            </p>
            </div>
        </div>
    );
}
export default UserSearch;