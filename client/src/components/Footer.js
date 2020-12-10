import React from 'react';


const Footer = () => {
    return (
        <div className="footer">
            <div>
                <div className="footerListContainer">
                    <div>
                    <h3 className="footerListHeader">Panayiotis' Links</h3>
                    <ul className="footerList">
                        <li><a href="https://www.linkedin.com/in/panayiotis-dimopoulos/">LinkedIn</a></li>
                        <li><a href="https://github.com/PanosPHL">GitHub</a></li>
                        <li><a href="https://panosphl.github.io/panos-portfolio/">Portfolio</a></li>
                    </ul>
                    </div>
                    <div>
                        <h3>Panayiotis' Project Links</h3>
                        <li><a href="https://github.com/PanosPHL/PlayerSeekingPlayer">Player Seeking Player Repo</a></li>
                        <li><a href="https://flownotes.herokuapp.com">flowNotes</a></li>
                        <li><a href="https://everquote.herokuapp.com">EverQuote</a></li>
                        <li><a href="https//aagoodreads.herokuapp.com">aAGoodreads</a></li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;