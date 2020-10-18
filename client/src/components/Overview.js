import React from 'react';
import aboutStyles from '../css-modules/About.module.css';


const Overview = ({ age, instrumentNames, styleNames, userProfile }) => {
    const locationRegex = /\s\d+/;
    const locationThing = userProfile ? userProfile.profileInfo.location.split(locationRegex) : "";
    return (
        <div className={aboutStyles.overviewContainer}>
            <div className={aboutStyles.overview}>
                <h3>Player Overview</h3>
                <p>
                    <span>{age ? age.toString() + " years old" : ""}</span>
                </p>
                <p>
                    <span>Lives in {userProfile ? userProfile.profileInfo.location.split(locationRegex)[0] : ""}</span>
                </p>
                <p>
                    <span>{"Plays the " + (instrumentNames && instrumentNames.length > 1 ?
                        instrumentNames.slice(0, instrumentNames.length - 1).join(', ') + " , and" + instrumentNames[instrumentNames.length - 1]
                        : instrumentNames ? instrumentNames[0] : <></>)}</span>
                </p>
                <p>
                    <span>Specializes in {styleNames && styleNames.length > 1 ?
                        styleNames.slice(0, styleNames.length - 1).join(', ') + " , and" + styleNames[styleNames.length - 1]
                        : styleNames ? styleNames[0] : <></>}</span>
                </p>
            </div>
        </div>
    )
}

export default Overview;