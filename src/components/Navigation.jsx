import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css"; // Import external CSS
import Logo from "../assets/LogoF.png"


function Navigation() {
  return (
    <div className="navbar-container">
      <div className="nav-bar d-flex align-items-center px-3">
        {/* Logo */}
        <a href="/">
          <img src={Logo} alt="Logo" height={60} width={60} />
        </a>

        {/* Title with Mafia-style effect */}
        <div className="nav-title">
        <a href="/" className="text-decoration-none">
          <h6>GameFact_42</h6>
          </a>
        </div>

        {/* Navigation Link */}
        <Link to={"/login"} className="nav-login text-black " >
          N
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
