import React from 'react';


const Errors = ({ className, errors, listClass, divStyle }) => {
    return (
        <div className={divStyle}>
        <ul className={className}>
            { errors.map((error, i) => <li className={listClass} key={`error-${i + 1}`}>{error}</li>) }
        </ul>
        </div>
    )
}

export default Errors;