import React from "react";

const Footer = () => {


  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          {/* <ul className="social-links"></ul> */}

          <ul className="copyright">
            <li>
              Copyright 	&copy;{" "}
              <a title="PAPA" href="#home">
                FindYou
              </a>
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a className="smoothscroll" title="Back to Top" href="#home">
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
