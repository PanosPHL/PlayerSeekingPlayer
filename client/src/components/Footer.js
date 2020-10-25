import React from 'react';


const Footer = () => {
    return (
        <div className="footer">
            <div>
                <div className="footerListContainer">
                    <ul className="footerList">
                        <h3 className="footerListHeader">MORE INFO</h3>
                        <li>
                            <a className="footerListItem" href='https://github.com/PanosPHL/PlayerSeekingPlayer'>GitHub Repo</a>
                        </li>
                        <li>
                            <a className="footerListItem" href='https://www.linkedin.com/in/panayiotis-dimopoulos/'>LinkedIn Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;