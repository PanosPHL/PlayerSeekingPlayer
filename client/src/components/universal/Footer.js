import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  console.log(location);
  const [footerClassName, setFooterClassName] = useState('footer');
  const profRegex = /\/profiles\/\d+/;
  const bandRegex = /\/my-bands/;
  const invitationRegex = /\/my-invitations/;
  const searchRegex = /\/search/;

  useEffect(() => {
    if (profRegex.test(location.pathname)) {
      setFooterClassName('profileFooter');
    } else if (bandRegex.test(location.pathname)) {
      setFooterClassName('bandFooter');
    } else if (invitationRegex.test(location.pathname)) {
      setFooterClassName('invitationFooter');
    } else if (searchRegex.test(location.pathname)) {
      setFooterClassName('searchFooter');
    }
  }, [location]);

  return (
    <div className={footerClassName}>
      <div>
        <h3 className="footerListHeader">Panayiotis' Links</h3>
        <ul className="footerList">
          <li>
            <a
              className="footerListItem"
              href="https://www.linkedin.com/in/panayiotis-dimopoulos/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a className="footerListItem" href="https://github.com/PanosPHL">
              GitHub
            </a>
          </li>
          <li>
            <a
              className="footerListItem"
              href="https://panosphl.github.io/panos-portfolio/"
            >
              Portfolio
            </a>
          </li>
        </ul>
      </div>
      <div className="footerListContainer">
        <h3 className="footerListHeader">Panayiotis' Project Links</h3>
        <ul className="footerList">
          <li>
            <a
              className="footerListItem"
              href="https://github.com/PanosPHL/PlayerSeekingPlayer"
            >
              Player Seeking Player Repo
            </a>
          </li>
          <li>
            <a
              className="footerListItem"
              href="https://flownotes.herokuapp.com"
            >
              flowNotes
            </a>
          </li>
          <li>
            <a
              className="footerListItem"
              href="https://everquote.herokuapp.com"
            >
              EverQuote
            </a>
          </li>
          <li>
            <a
              className="footerListItem"
              href="https//aagoodreads.herokuapp.com"
            >
              aAGoodreads
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
