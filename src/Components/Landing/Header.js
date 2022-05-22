import React from "react";
import TypeWriter from "react-typewriter";

const Header = () => {


  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <a className="logoname">FINDYOU</a>

          <li className="current">

            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>


          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline" style={{ 'font-size': 60 }}>
            <TypeWriter typing={0.5} >People Search made easy...</TypeWriter>
          </h1>
          <h3>
            We help you to find lost friends and family.
          </h3>
          <hr />

          <a className=" smoothscroll button" href="#about">
            {/* <i className="fa fa-upload"></i> */}
            <i className="fa-lg fa-solid fa-users-viewfinder"></i>
            &nbsp;
            Find Missing
          </a>
          {/* <ul className="social">{networks}</ul> */}
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
