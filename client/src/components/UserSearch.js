import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchResultContext from '../contexts/SearchResultContext';

const UserSearch = ({ id }) => {
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

    const { setActiveResult } = useContext(SearchResultContext);

    return (
        <div onClick={() => setActiveResult(id)}>
            <Link to={`/profiles/${id}`}>
            <h4>{userInfo.firstName + " " + userInfo.lastName}</h4>
            </Link>
            <p>Instrument(s): {userInstruments.length === 3 ?
            userInstruments.slice(0, userInstruments.length - 1).join(', ') + ", and " + userInstruments[userInstruments.length - 1]
            : userInstruments.length === 2 ?
            userInstruments.join(' and ') : userInstruments.length === 1 ? userInstruments[0] :
            <></>}
            </p>
            <p>Style(s): {userStyles.length === 3 ?
            userStyles.slice(0, userStyles.length - 1).join(', ') + ", and " + userStyles[userStyles.length - 1]
            : userStyles.length === 2 ?
            userStyles.join(' and ') : userStyles.length === 1 ? userStyles[0] :
            <></>}
            </p>
        </div>
    );
}
export default UserSearch;