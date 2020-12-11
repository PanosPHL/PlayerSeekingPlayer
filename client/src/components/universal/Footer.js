import React from 'react';


const Footer = () => {
    return (
        <div className="footer">
                    <div className="footerListContainer">
                        <h3 className="footerListHeader">Panayiotis' Links</h3>
                        <ul className="footerList">
                            <li><a className="footerListItem" href="https://www.linkedin.com/in/panayiotis-dimopoulos/">LinkedIn</a></li>
                            <li><a className="footerListItem" href="https://github.com/PanosPHL">GitHub</a></li>
                            <li><a className="footerListItem" href="https://panosphl.github.io/panos-portfolio/">Portfolio</a></li>
                        </ul>
                    </div>
                    <div className="footerListContainer">
                        <h3 className="footerListHeader">Panayiotis' Project Links</h3>
                        <ul className="footerList">
                            <li><a className="footerListItem" href="https://github.com/PanosPHL/PlayerSeekingPlayer">Player Seeking Player Repo</a></li>
                            <li><a className="footerListItem" href="https://flownotes.herokuapp.com">flowNotes</a></li>
                            <li><a className="footerListItem" href="https://everquote.herokuapp.com">EverQuote</a></li>
                            <li><a className="footerListItem" href="https//aagoodreads.herokuapp.com">aAGoodreads</a></li>
                        </ul>
                    </div>
        </div>
    )
}

export default Footer;