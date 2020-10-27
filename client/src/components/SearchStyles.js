import React from 'react';
import { useSelector } from 'react-redux';
import Checkbox from './Checkbox';

const SearchStyles = ({ className, labelStyle, checkboxStyle }) => {
    const styles = useSelector(state => Object.values(state.entities.styles));

    return (
        <ul className={className}>
            {
                styles && styles.length ?
                styles.map((style, i) => {
                    return (
                        <li key={`style-${i + 1}`}>
                            <label className={labelStyle}>{style.name}</label>
                            <Checkbox
                            name={`style-${i + 1}`}
                            initValue={style.id}
                            type="searchStyle"/>
                        </li>
                    )
                }) : <></>
            }
        </ul>
    )
}

export default SearchStyles;