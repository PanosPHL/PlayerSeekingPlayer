import React from 'react';
import { useSelector } from 'react-redux';

const UserSearch = ({ id }) => {
    const userInfo = useSelector(state => state.entities.users[id]);
    const userInstruments = useSelector(state => {
        return userInfo ? userInfo.profileInfo.instruments.map((instrument) => {
                return state.entities.instruments[instrument]
            }) : null
    });
    return (
        <div>
            <h4>{userInfo.firstName + " " + userInfo.lastName}</h4>
    <span>Instruments: {}</span>
        </div>
    );
}
export default UserSearch;