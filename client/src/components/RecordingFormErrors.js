import React from 'react';

const RecordingFormErrors = ({ errors }) => {
    return (
        <ul>
            {errors.map((error, i) => <li key={`error-${i + 1}`}>{error}</li>)}
        </ul>
    )
}

export default RecordingFormErrors;