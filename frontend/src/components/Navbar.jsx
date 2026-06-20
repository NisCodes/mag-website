import React, { useState } from "react";
import "../css/navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header id="header" className="header fixed-top">
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            <img src="assets/img/MAGlogo.png" alt="" />
            <h1 className="sitename">MAG.com</h1>
          </a>

          <nav id="navblog" className="navblog">
            <ul>
              <li>
                <a
                  href="#hero"
                  className={activeLink === "home" ? "active" : ""}
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className={activeLink === "events" ? "active" : ""}
                  onClick={() => handleLinkClick("events")}
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#magazine"
                  className={activeLink === "magazine" ? "active" : ""}
                  onClick={() => handleLinkClick("magazine")}
                >
                  Magazine
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className={activeLink === "blog" ? "active" : ""}
                  onClick={() => handleLinkClick("blog")}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#Eyes_only"
                  className={activeLink === "eyes_only" ? "active" : ""}
                  onClick={() => handleLinkClick("eyes_only")}
                >
                  Eyes only
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className={activeLink === "gallery" ? "active" : ""}
                  onClick={() => handleLinkClick("gallery")}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className={activeLink === "team" ? "active" : ""}
                  onClick={() => handleLinkClick("team")}
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={activeLink === "contact" ? "active" : ""}
                  onClick={() => handleLinkClick("contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a
            className="btn-add-your-content d-none d-xl-block"
            href="#add-your-content"
          >
            Add yours !
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
