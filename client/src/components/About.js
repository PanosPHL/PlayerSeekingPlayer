import React from 'react';


const About = ({ userProfile }) => {
    const age = userProfile ? Math.abs(new Date(new Date(userProfile.dateOfBirth).getTime() - Date.now()).getUTCFullYear() - 1970) : null;
    return (
        <div>
            <div>
                <h2>About</h2>
            </div>
            <div>
                <h4>Age: {age ? age.toString() : ""}</h4>
                <h4>Biography:</h4>
                <p>{userProfile ? userProfile.biography : ""}</p>
            </div>
        </div>
    )
}

export default About;